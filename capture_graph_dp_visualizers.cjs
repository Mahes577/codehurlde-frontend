const fs = require('fs');
const path = require('path');

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

  // 1. In Design System: Inspect GraphAlgorithmVisualizer
  console.log("Selecting GraphAlgorithmVisualizer in Design System...");
  await clickButtonWithText("Organisms (9)");
  await sleep(800);
  await clickButtonWithText("GraphAlgorithmVisualizer");
  await sleep(1000);

  // Advance step in graph visualizer
  await clickButtonWithText("Next Step →");
  await sleep(800);
  await clickButtonWithText("Next Step →");
  await sleep(800);
  console.log("Capturing 24_graph_algorithm_visualizer_steps.png...");
  const shotGraph = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/24_graph_algorithm_visualizer_steps.png", Buffer.from(shotGraph.data, "base64"));

  // 2. In Design System: Inspect DpAlgorithmVisualizer
  console.log("Selecting DpAlgorithmVisualizer in Design System...");
  await clickButtonWithText("DpAlgorithmVisualizer");
  await sleep(1000);
  await clickButtonWithText("Next Step →");
  await sleep(600);
  await clickButtonWithText("Next Step →");
  await sleep(600);
  await clickButtonWithText("Next Step →");
  await sleep(600);
  console.log("Capturing 25_dp_algorithm_visualizer_steps.png...");
  const shotDp = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/25_dp_algorithm_visualizer_steps.png", Buffer.from(shotDp.data, "base64"));

  // 3. Navigate to Home Page and test multi-paradigm hero
  console.log("Navigating to Home Page Hero Showcase...");
  await clickButtonWithText("Home");
  await sleep(1000);

  // Switch Hero to Graph problem
  console.log("Switching Hero to #743 Graph Path...");
  await clickButtonWithText("#743 Graph Path");
  await sleep(1000);
  console.log("Capturing 26_hero_graph_showcase.png...");
  const shotHeroGraph = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/26_hero_graph_showcase.png", Buffer.from(shotHeroGraph.data, "base64"));

  // Switch Hero to DP problem
  console.log("Switching Hero to #322 Coin Change (DP)...");
  await clickButtonWithText("#322 Coin Change (DP)");
  await sleep(1000);
  console.log("Capturing 27_hero_dp_showcase.png...");
  const shotHeroDp = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/27_hero_dp_showcase.png", Buffer.from(shotHeroDp.data, "base64"));

  // Return to Design System so it stays the primary landing view
  await clickButtonWithText("Design System");
  await sleep(800);

  pageWs.close();
  console.log("All graph and DP screenshots captured successfully!");
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
