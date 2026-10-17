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
  console.log("Connecting to browser ws:", BROWSER_WS);
  const browserWs = new WebSocket(BROWSER_WS);
  await new Promise(r => browserWs.onopen = r);
  const browserSend = createRpc(browserWs);

  // Create or attach to page target
  const target = await browserSend("Target.createTarget", { url: TARGET_URL });
  console.log("Created target:", target.targetId);
  browserWs.close();

  // Connect to page session
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

  await new Promise(r => setTimeout(r, 2000));
  fs.mkdirSync('images', { recursive: true });

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // Helper to click by button text
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

  // 1. Home View
  console.log("Capturing 01_codehurdle_home.png...");
  await pageSend("Page.navigate", { url: TARGET_URL });
  await sleep(1500);
  const shot1 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/01_codehurdle_home.png", Buffer.from(shot1.data, "base64"));

  // 2. Compiler / IDE View
  console.log("Capturing 02_codehurdle_compiler_ide.png...");
  await clickButtonWithText("Compiler / IDE");
  await sleep(1200);
  const shot2 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/02_codehurdle_compiler_ide.png", Buffer.from(shot2.data, "base64"));

  // Click Submit Solution to show verdict card
  await clickButtonWithText("Submit Solution");
  await sleep(1500);
  const shot3 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/03_codehurdle_compiler_verdict.png", Buffer.from(shot3.data, "base64"));

  // 3. User Profile
  console.log("Capturing 04_codehurdle_user_profile.png...");
  await clickButtonWithText("Profile");
  await sleep(1200);
  const shot4 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/04_codehurdle_user_profile.png", Buffer.from(shot4.data, "base64"));

  // 4. Roadmap
  console.log("Capturing 05_codehurdle_roadmap.png...");
  await clickButtonWithText("29-Tracks");
  await sleep(1200);
  const shot5 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/05_codehurdle_roadmap.png", Buffer.from(shot5.data, "base64"));

  // 5. CP Arena
  console.log("Capturing 07_codehurdle_cp_arena.png...");
  await clickButtonWithText("CP Arena");
  await sleep(1200);
  const shot7 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/07_codehurdle_cp_arena.png", Buffer.from(shot7.data, "base64"));

  // 6. Community
  console.log("Capturing 08_codehurdle_community.png...");
  await clickButtonWithText("Community");
  await sleep(1200);
  const shot8 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/08_codehurdle_community.png", Buffer.from(shot8.data, "base64"));

  // 7. Job Prep
  console.log("Capturing 09_codehurdle_jobprep.png...");
  await clickButtonWithText("Job Prep");
  await sleep(1200);
  const shot9 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/09_codehurdle_jobprep.png", Buffer.from(shot9.data, "base64"));

  // 8. Reusable Component Drawer (Atomic Design System Showcase)
  console.log("Capturing 06_codehurdle_reusable_drawer.png...");
  await clickButtonWithText("Design System");
  await sleep(1000);
  const shot6 = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/06_codehurdle_reusable_drawer.png", Buffer.from(shot6.data, "base64"));

  // Also switch drawer to Atoms tab
  await clickButtonWithText("Atoms (7)");
  await sleep(600);
  const shot6Atoms = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("images/10_atomic_design_atoms.png", Buffer.from(shot6Atoms.data, "base64"));

  pageWs.close();
  console.log("All screenshots captured successfully!");
}

run().catch(err => {
  console.error("Error running capture:", err);
  process.exit(1);
});
