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
  await clickButtonWithText("Design System");
  await sleep(1000);

  // Click the test button in the Atom workbench
  await clickButtonWithText("Click Me To Test Feedback");
  await sleep(600);
  const shot1 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/11_interactive_atom_workbench.png", Buffer.from(shot1.data, "base64"));
  console.log("Captured images/11_interactive_atom_workbench.png");

  // 2. Switch to Molecules -> ProblemRow
  await clickButtonWithText("Molecules (4)");
  await sleep(600);
  // Click ProblemRow component button
  await pageSend("Runtime.evaluate", {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.innerText && b.innerText.includes("ProblemRow"));
      btn?.click();
    })()`
  });
  await sleep(800);
  const shot2 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/12_interactive_molecule_workbench.png", Buffer.from(shot2.data, "base64"));
  console.log("Captured images/12_interactive_molecule_workbench.png");

  // 3. Switch to Organisms -> CompilerView Sandbox
  await clickButtonWithText("Organisms (7)");
  await sleep(600);
  await pageSend("Runtime.evaluate", {
    expression: `(() => {
      const btn = Array.from(document.querySelectorAll("button")).find(b => b.innerText && b.innerText.includes("CompilerView"));
      btn?.click();
    })()`
  });
  await sleep(800);
  // Click Run In-Sandbox
  await clickButtonWithText("Run In-Sandbox");
  await sleep(1000);
  const shot3 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/13_interactive_organism_sandbox.png", Buffer.from(shot3.data, "base64"));
  console.log("Captured images/13_interactive_organism_sandbox.png");

  pageWs.close();
  console.log("Workbench capture completed!");
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
