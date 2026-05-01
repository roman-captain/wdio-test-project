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

- `config/env.js` - BASE_URL, TIMEOUT, HEADLESS, credentials
- `fixtures/testData.js` - test data
- `helpers/` - utility functions
- `pages/` - Page Object classes (base, login, signup, main)
- `tests/github.spec.js` - E2E tests (@smoke / @regression)
- `wdio.conf.js` - WebdriverIO config
- `.env` - local env vars, not committed

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
npm run test             # all tests
npm run test:smoke       # @smoke only
npm run test:regression  # @regression only
```

## Allure Report

```bash
npm run report:generate  # generate HTML report
npm run report           # generate and open in browser
```
