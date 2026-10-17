const fs = require('fs');

const BROWSER_WS = process.env.MORPHITE_BROWSER_WS;
const TARGET_URL = 'http://127.0.0.1:46727/';

if (!BROWSER_WS) {
  console.error("No MORPHITE_BROWSER_WS found!");
  process.exit(1);
}

function createRpc(ws) {
  let id = 1;
  return function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (evt) => {
        const d = JSON.parse(evt.data);
        if (d.id === msgId) {
          ws.removeEventListener('message', handler);
          if (d.error) reject(d.error);
          else resolve(d.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  };
}

async function run() {
  const browserWs = new WebSocket(BROWSER_WS);
  await new Promise(r => browserWs.onopen = r);
  const browserSend = createRpc(browserWs);

  const target = await browserSend("Target.createTarget", { url: TARGET_URL });
  browserWs.close();

  const pageWsUrl = BROWSER_WS.replace('/devtools/browser/morphite', `/devtools/page/${target.targetId}`);
  const pageWs = new WebSocket(pageWsUrl);
  await new Promise(r => pageWs.onopen = r);
  const pageSend = createRpc(pageWs);

  await pageSend("Page.enable");
  await pageSend("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1050,
    deviceScaleFactor: 1,
    mobile: false
  });

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  await sleep(1500);

  async function clickButtonWithText(text) {
    return pageSend("Runtime.evaluate", {
      expression: `(() => {
        const btn = Array.from(document.querySelectorAll("button")).find(b => b.innerText && b.innerText.includes(${JSON.stringify(text)}));
        if (btn) {
          btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
          btn.click();
          return true;
        }
        return false;
      })()`
    });
  }

  // 1. In Design System: Select GraphAlgorithmVisualizer
  console.log("Navigating to GraphAlgorithmVisualizer in Design System...");
  await clickButtonWithText("Organisms (9)");
  await sleep(800);
  await clickButtonWithText("GraphAlgorithmVisualizer");
  await sleep(1000);

  // Advance step all the way to Step 6 (Final Shortest Path)
  for (let i = 0; i < 6; i++) {
    await clickButtonWithText("Next Step →");
    await sleep(400);
  }
  await sleep(800);

  console.log("Capturing 28_graph_shortest_path_fixed.png...");
  const shotGraphFinal = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/28_graph_shortest_path_fixed.png", Buffer.from(shotGraphFinal.data, "base64"));

  // 2. Go to Home Page and check the Hero #743 Graph Path tab at final step
  console.log("Checking Hero Graph showcase on Home page...");
  await clickButtonWithText("Home");
  await sleep(1000);
  await clickButtonWithText("#743 Graph Path");
  await sleep(800);

  // Advance to final step on Hero
  for (let i = 0; i < 6; i++) {
    await clickButtonWithText("Next Step →");
    await sleep(400);
  }
  await sleep(800);

  console.log("Capturing 29_hero_graph_shortest_path_verified.png...");
  const shotHeroGraphFinal = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/29_hero_graph_shortest_path_verified.png", Buffer.from(shotHeroGraphFinal.data, "base64"));

  // Return to Design System as primary
  await clickButtonWithText("Design System");
  await sleep(600);

  pageWs.close();
  console.log("Verification screenshots captured successfully!");
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
