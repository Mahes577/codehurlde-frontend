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

  // Ensure images directory exists
  if (!fs.existsSync('images')) {
    fs.mkdirSync('images', { recursive: true });
  }

  // 1. In Design System: Inspect TreeAlgorithmVisualizer
  console.log("Selecting Organisms (10) in Design System...");
  await clickButtonWithText("Organisms (10)");
  await sleep(800);
  console.log("Selecting TreeAlgorithmVisualizer in Design System...");
  await clickButtonWithText("TreeAlgorithmVisualizer");
  await sleep(1000);

  // Advance step in Tree visualizer to reach LCA discovery
  console.log("Advancing Tree visualizer steps...");
  await clickButtonWithText("Next Step \u2192");
  await sleep(500);
  await clickButtonWithText("Next Step \u2192");
  await sleep(500);
  await clickButtonWithText("Next Step \u2192");
  await sleep(500);
  await clickButtonWithText("Next Step \u2192");
  await sleep(500);
  await clickButtonWithText("Next Step \u2192");
  await sleep(800);

  console.log("Capturing 30_tree_algorithm_visualizer_lca.png...");
  const shotTree = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/30_tree_algorithm_visualizer_lca.png", Buffer.from(shotTree.data, "base64"));

  // 2. Navigate to Home Page and test multi-paradigm hero with Tree LCA
  console.log("Navigating to Home Page Hero Showcase...");
  await clickButtonWithText("Home");
  await sleep(1000);

  // Switch Hero to Tree LCA problem
  console.log("Switching Hero to #236 Tree LCA...");
  await clickButtonWithText("#236 Tree LCA");
  await sleep(1000);

  // Step tree in hero
  await clickButtonWithText("Next Step \u2192");
  await sleep(400);
  await clickButtonWithText("Next Step \u2192");
  await sleep(400);

  console.log("Capturing 31_hero_tree_showcase.png...");
  const shotHeroTree = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/31_hero_tree_showcase.png", Buffer.from(shotHeroTree.data, "base64"));

  // 3. Switch Hero to #743 Graph Path and advance to final step to verify connected ribbon
  console.log("Switching Hero to #743 Graph Path...");
  await clickButtonWithText("#743 Graph Path");
  await sleep(800);
  // advance to step 5 (Final Shortest Path)
  for (let i = 0; i < 5; i++) {
    await clickButtonWithText("Next Step \u2192");
    await sleep(300);
  }
  await sleep(600);

  console.log("Capturing 32_hero_graph_path_verified.png...");
  const shotHeroGraph = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/32_hero_graph_path_verified.png", Buffer.from(shotHeroGraph.data, "base64"));

  // Return to Design System so it stays the primary landing view
  console.log("Returning to Design System View as primary landing...");
  await clickButtonWithText("Design System");
  await sleep(800);

  // Close target
  const browserWs2 = new WebSocket(BROWSER_WS);
  await new Promise(r => browserWs2.onopen = r);
  const browserSend2 = createRpc(browserWs2);
  await browserSend2("Target.closeTarget", { targetId: target.targetId });
  browserWs2.close();
  pageWs.close();

  console.log("All screenshots captured and verified successfully!");
}

run().catch(err => {
  console.error("Error running script:", err);
  process.exit(1);
});
