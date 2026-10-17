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
    height: 960,
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

  // 1. Initial Load: Primary Page should be Design System
  console.log("Capturing 18_design_system_primary_hero.png...");
  await sleep(1000);
  const shotPrimary = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/18_design_system_primary_hero.png", Buffer.from(shotPrimary.data, "base64"));

  // 2. Select Atoms Filter
  console.log("Capturing 19_design_system_atoms_interactive.png...");
  await clickButtonWithText("Atoms (8)");
  await sleep(800);
  await clickButtonWithText("Button");
  await sleep(600);
  // Click test button
  await clickButtonWithText("Click Me To Test");
  await sleep(500);
  const shotAtoms = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/19_design_system_atoms_interactive.png", Buffer.from(shotAtoms.data, "base64"));

  // 3. Select Molecules Filter
  console.log("Capturing 20_design_system_molecules_interactive.png...");
  await clickButtonWithText("Molecules (10)");
  await sleep(800);
  await clickButtonWithText("ProblemRow");
  await sleep(600);
  const shotMolecules = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/20_design_system_molecules_interactive.png", Buffer.from(shotMolecules.data, "base64"));

  // 4. Switch to Gallery Mode
  console.log("Capturing 21_design_system_gallery_mode.png...");
  await clickButtonWithText("Gallery Mode");
  await sleep(800);
  await clickButtonWithText("All Library (28)");
  await sleep(800);
  const shotGallery = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/21_design_system_gallery_mode.png", Buffer.from(shotGallery.data, "base64"));

  // 5. Navigate to Home
  console.log("Capturing 22_navigated_to_home.png...");
  await clickButtonWithText("Home");
  await sleep(1000);
  const shotHome = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/22_navigated_to_home.png", Buffer.from(shotHome.data, "base64"));

  // 6. Navigate back to Design System to leave it active
  console.log("Switching back to Design System...");
  await clickButtonWithText("Design System");
  await sleep(1000);
  const shotFinal = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/23_design_system_landing_confirmed.png", Buffer.from(shotFinal.data, "base64"));

  pageWs.close();
  console.log("All screenshots captured successfully!");
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
