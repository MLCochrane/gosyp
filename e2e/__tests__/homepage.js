
describe('/ (Home Page)', () => {
  let page;
  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080
    });

    await page.goto('http://web:80');
  });

  afterAll(async () => {
    await page.close();
  });

  it('should load without error', async () => {
    await expect(page.title()).resolves.toMatch('GOSYP');
  });

  it('shows sidebar with default content', async () => {
    const sidebar = await page.waitForSelector('[data-testid="info-block"]');
    expect(sidebar).toBeTruthy();
    expect(await page.evaluate((el) => el.textContent, sidebar)).toContain('Not much happening...');
    expect(await page.evaluate((el) => el.textContent, sidebar)).toContain('Once you\'re in a room you can see details about it here. Now go get chatting!');
  });

  it('switches between homepage forms', async () => {
    expect(await page.waitForSelector('.join-form')).toBeTruthy();
    await page.click('[data-testid="toggle-button"]');
    expect(await page.waitForSelector('.create-form')).toBeTruthy();
    await page.click('[data-testid="toggle-button"]');
    expect(await page.waitForSelector('.join-form')).toBeTruthy();
  });

  it('it creates a new room with empty fields', async () => {
    const toggleQuery = '[data-testid="toggle-button"]';
    const formQuery = '.create-form';
    const submitButtonQuery = '.create-form button[type=submit]';
    const sidebarQuery = '[data-testid="room-details"]';

    // Clicks toggle and gets create form
    await page.click(toggleQuery);
    await page.waitForSelector(formQuery);

    // Got our submit button and it's not disabled
    const button = await page.waitForSelector(submitButtonQuery);
    expect(await page.evaluate((el) => el.getAttribute('disabled'), button)).toBeNull();

    // Submit and check we're now in the chat room
    await page.click(submitButtonQuery);
    const sidebar = await page.waitForSelector(sidebarQuery);
    expect(await page.evaluate((el) => el.textContent, sidebar)).toContain('Chatting is better with friends!');
  });
});
