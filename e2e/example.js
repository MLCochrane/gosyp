const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: [
      "--no-sandbox",
      "--no-default-browser-check",
    ]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080
  });

  page.on('console', (msg) => console.log('PAGE LOG: ' + msg.text()));
  page.on('network', (req) => console.log('NETWORK LOG: ' + req.url()));

  const tick = Date.now();
  await page.goto('http://web:4242', {
    waitUntil: 'domcontentloaded',
    timeout: 0,
  });
  console.log(`After: ${Date.now() - tick}`);
  // const toggleQuery = '[data-testid="toggle-button"]';
  // const formQuery = '.create-form';
  // const submitButtonQuery = '.create-form button[type=submit]';
  // const sidebarQuery = '[data-testid="room-details"]';

  // await page.screenshot({ path: '/tmp/artifacts/test.png' });
  // await page.click(toggleQuery);
  // await page.click(submitButtonQuery);
  // await page.waitForTimeout(5000);
  // await page.screenshot({ path: '/tmp/artifacts/test2.png' });

  await browser.close();
})();
