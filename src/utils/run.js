const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const headed = args.includes('--headed');
const cucumberArgs = args.filter((arg) => arg !== '--headed');

if (headed) {
  process.env.HEADLESS = 'false';
}

const cucumberBin = path.join(__dirname, '..', '..', 'node_modules', '@cucumber', 'cucumber', 'bin', 'cucumber.js');
const result = spawnSync(process.execPath, [cucumberBin, ...cucumberArgs], {
  stdio: 'inherit',
  env: process.env,
});

const jsonReport = path.join('reports', 'cucumber-report.json');
if (fs.existsSync(jsonReport)) {
  require('./reporter');
}

const cucumberHtml = path.resolve('reports', 'cucumber-report.html');
if (!process.env.CI && fs.existsSync(cucumberHtml)) {
  if (process.platform === 'win32') {
    spawnSync('cmd', ['/c', 'start', '', cucumberHtml], { stdio: 'ignore' });
  } else if (process.platform === 'darwin') {
    spawnSync('open', [cucumberHtml], { stdio: 'ignore' });
  } else {
    spawnSync('xdg-open', [cucumberHtml], { stdio: 'ignore' });
  }
}

process.exit(result.status === null ? 1 : result.status);
