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
    height: 900,
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

  // 1. Open Design System Drawer
  console.log("Opening Design System Drawer...");
  await clickButtonWithText("Design System");
  await sleep(1000);

  // 2. View Tokens
  console.log("Capturing 14_tokens_tier.png...");
  await clickButtonWithText("Tokens (3)");
  await sleep(800);
  const shotTokens = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/14_tokens_tier.png", Buffer.from(shotTokens.data, "base64"));

  // 3. View Molecules
  console.log("Capturing 15_molecules_tier.png...");
  await clickButtonWithText("Molecules (10)");
  await sleep(800);
  const shotMolecules = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/15_molecules_tier.png", Buffer.from(shotMolecules.data, "base64"));

  // 4. Click CompanyPill molecule
  console.log("Capturing 16_molecule_company_pill.png...");
  await clickButtonWithText("CompanyPill");
  await sleep(800);
  const shotCompany = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/16_molecule_company_pill.png", Buffer.from(shotCompany.data, "base64"));

  // 5. Close drawer and capture Main Page with integrated molecules
  console.log("Capturing 17_main_page_molecules.png...");
  await clickButtonWithText("Close");
  await sleep(1000);
  const shotMain = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/17_main_page_molecules.png", Buffer.from(shotMain.data, "base64"));

  pageWs.close();
  console.log("All tier screenshots captured successfully!");
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
