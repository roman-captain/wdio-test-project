# wdio-test-project

Automation test suite for [github.com](https://github.com) - AQA internship practice project.

## Tech Stack

| Component      | Technology             |
|----------------|------------------------|
| Language       | JavaScript (ES Modules)|
| Test Framework | WebdriverIO v9         |
| Test Runner    | Mocha                  |
| Reporting      | Allure Report          |
| CI/CD          | GitHub Actions         |

## Project Structure

```
pages/
  desktop/    - Page Objects for desktop layout
  mobile/     - Page Objects for mobile layout (hamburger nav, touch interactions)
tests/
  desktop/    - E2E tests for desktop (@smoke / @regression)
  mobile/     - E2E tests for mobile (@mobile)
config/
  env.js      - environment variables
fixtures/
  testData.js - test data shared across desktop and mobile suites
wdio.conf.js                - desktop config (Chrome, local)
wdio.mobile.local.conf.js   - mobile config (Chrome mobileEmulation, Samsung Galaxy S20 Ultra 412px)
browserstack.conf.js        - mobile config (real Samsung Galaxy S23 on BrowserStack)
.env                        - local env vars, not committed
```

## Setup

1. Install dependencies

```bash
npm install
```

2. Create `.env` file in project root

```
BASE_URL=https://github.com
TIMEOUT=10000
HEADLESS=false
TEST_USER_EMAIL=your_email@example.com
TEST_USER_PASSWORD=your_password
```

## Running Tests

```bash
# Desktop (local Chrome)
npm run test              # all desktop tests
npm run test:smoke        # @smoke only
npm run test:regression   # @regression only

# Mobile (local Chrome mobileEmulation - Samsung Galaxy S20 Ultra)
npm run test:mobile       # all @mobile tests, no BrowserStack account needed

# Mobile (real device on BrowserStack - Samsung Galaxy S23)
npm run test:browserstack # requires BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY in .env
```

## CI/CD

| Workflow | Trigger | Suite |
|----------|---------|-------|
| AQA Tests | push / PR / nightly | desktop @smoke + @regression |
| Mobile Tests (BrowserStack) | manual only (Run workflow) | mobile @mobile on real device |

## Allure Report

```bash
npm run report:generate  # generate HTML report
npm run report           # generate and open in browser
```
