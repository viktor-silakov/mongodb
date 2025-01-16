const { trace } = require("console");

// This is a sample config for what users might be running locally
const config = {
  testDir: './tests',
  // testMatch: '**/bstack_test*.js',

  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  /* tests in parallel */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'line',
  reporter: [['line'], ['html', { open: "on-failure" }]],

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        trace: 'on', 
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
};

module.exports = config;
