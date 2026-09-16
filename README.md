# Playwright BDD

Playwright + Cucumber (Gherkin, POM, tags) against the [Toolshop](https://practicesoftwaretesting.com) 

UI-only: register, sign in, catalog, checkout. No API setup. Each run registers a unique user (the shared demo customer is often locked).

## Prerequisites

- Node.js 18+
- npm

## Setup

From this folder:

```powershell
npm install
npx playwright install chromium
copy .env.example .env
```

On macOS/Linux use `cp .env.example .env`.

`npm install` pulls `@cucumber/cucumber`, `@playwright/test`, `cucumber-html-reporter`, and `dotenv`. Playwright browsers are separate — that is why `npx playwright install chromium` is required.

### Cucumber glue (Ctrl+click)

Install the recommended extensions so a step in a `.feature` file jumps to the step definition, then to the page object:

```powershell
cursor --install-extension CucumberOpen.cucumber-official
cursor --install-extension alexkrechik.cucumberautocomplete
```

Or install them when Cursor prompts from `.vscode/extensions.json`.

## Run

```powershell
npm test              # all scenarios, headless
npm run test:headed   # same suite, visible browser (slowMo 250)
npm run test:smoke    # @smoke (catalog)
npm run test:e2e      # @checkout (register → cart → cash on delivery)
```

Pass extra Cucumber flags through the wrapper:

```powershell
node src/utils/run.js --tags "@smoke or @checkout"
node src/utils/run.js --headed --tags @checkout
```

Headed mode sets `HEADLESS=false`. You can also set env vars yourself:

```powershell
$env:HEADLESS="false"; npm test
$env:UI_BASE_URL="https://practicesoftwaretesting.com"; npm test
```

## Report

Every `npm test` / `test:headed` / `test:smoke` / `test:e2e` run writes JSON, builds HTML (`cucumber-html-reporter`, bootstrap theme), then opens the HTML file.

| Output | Path |
|---|---|
| Cucumber JSON | `reports/cucumber-report.json` |
| HTML (KPI cards, pie charts, feature accordions) | `reports/cucumber-report.html` |

Rebuild HTML from an existing JSON file (does not re-run tests):

```powershell
npm run report
```

Open the last HTML report manually:

```powershell
start reports\cucumber-report.html
```

On macOS: `open reports/cucumber-report.html`. On Linux: `xdg-open reports/cucumber-report.html`.

## Env (`.env`)

| Variable | Default | Notes |
|---|---|---|
| `UI_BASE_URL` | `https://practicesoftwaretesting.com` | Toolshop UI |
| `BROWSER` | `chromium` | `chromium`, `firefox`, or `webkit` |
| `HEADLESS` | `true` | `false` for a visible browser |
| `TIMEOUT` | `60000` | Cucumber step timeout (ms) |

## Tags

| Tag | Feature |
|---|---|
| `@smoke` / `@catalog` | Home page lists products |
| `@e2e` / `@checkout` | Register, sign in, cart, cash on delivery |

## CI

GitHub Actions starts the Toolshop application inside the job with Docker Compose, runs `npm test` against `http://localhost:4200`, and uploads `reports/` as the `cucumber-report` artifact.

The public site is not used in CI: Cloudflare serves a managed challenge to GitHub datacenter IPs, which breaks multi-step UI flows (for example login after register).

## Layout

```
src/features          Gherkin
src/stepDefinitions   steps
src/pageObjects       POM
src/hooks             browser launch / teardown
src/support           Cucumber World
src/utils             run wrapper + HTML reporter
reports/              cucumber-report.json + cucumber-report.html
```
