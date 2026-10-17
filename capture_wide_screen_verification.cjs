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
  // Set viewport to 1920x1080 (user's exact 100% monitor resolution)
  await pageSend("Emulation.setDeviceMetricsOverride", {
    width: 1920,
    height: 1080,
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

  // 1. In Design System: Capture wide-screen layout
  console.log("Capturing 33_design_system_wide_1920.png...");
  const shotDS = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/33_design_system_wide_1920.png", Buffer.from(shotDS.data, "base64"));

  // 2. Navigate to Home Page
  console.log("Navigating to Home Page...");
  await clickButtonWithText("Home");
  await sleep(1200);

  console.log("Capturing 34_home_hero_wide_1920.png...");
  const shotHomeHero = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/34_home_hero_wide_1920.png", Buffer.from(shotHomeHero.data, "base64"));

  // Scroll down to Problem Explorer and Heatmap
  console.log("Scrolling down to Problem Explorer...");
  await pageSend("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 1100, behavior: 'instant' })`
  });
  await sleep(800);

  console.log("Capturing 35_home_problem_explorer_wide_1920.png...");
  const shotProblemExplorer = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/35_home_problem_explorer_wide_1920.png", Buffer.from(shotProblemExplorer.data, "base64"));

  // Scroll down to FAQ and CTA
  console.log("Scrolling down to FAQ & CTA...");
  await pageSend("Runtime.evaluate", {
    expression: `window.scrollTo({ top: 2400, behavior: 'instant' })`
  });
  await sleep(800);

  console.log("Capturing 36_home_faq_cta_wide_1920.png...");
  const shotFaqCta = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/36_home_faq_cta_wide_1920.png", Buffer.from(shotFaqCta.data, "base64"));

  // Return to Design System View as default
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

  console.log("Wide-screen 1920px captures complete!");
}

run().catch(err => {
  console.error("Error running script:", err);
  process.exit(1);
});
