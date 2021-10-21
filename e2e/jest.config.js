module.exports = {
  globalSetup: './setup/setup.js',
  globalTeardown: './setup/teardown.js',
  testEnvironment: './setup/puppeteer_environment.js',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'pupeteer tests',
        outputFile: '/home/circleci/project/results/junit.xml',
      },
    ],
  ],
};