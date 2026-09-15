require('dotenv').config();

const uiBaseUrl = (process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com').replace(/\/$/, '');

module.exports = {
  uiBaseUrl,
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS !== 'false',
  timeoutMs: Number(process.env.TIMEOUT || 60_000),
};
