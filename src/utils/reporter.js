const reporter = require('cucumber-html-reporter');
const config = require('../config');

reporter.generate({
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  brandTitle: 'Toolshop - Test Automation Report',
  name: 'playwright-bdd',
  metadata: {
    'Test Environment': config.uiBaseUrl,
    Browser: config.browser,
    Platform: process.platform,
    Executed: config.headless ? 'Headless' : 'Headed',
  },
});

console.log('HTML report: reports/cucumber-report.html');
