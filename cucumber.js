module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/support/world.js', 'src/hooks/hooks.js', 'src/stepDefinitions/**/*.js'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    failFast: false,
    strict: true,
  },
};
