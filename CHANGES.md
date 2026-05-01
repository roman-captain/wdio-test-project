# CHANGES

## Fix: resolve failing tests - cookie banner and locator updates

**Date:** 2026-05-01
**Status:** 6/6 tests passing (local + CI)

---

### Problem

3 out of 6 tests were failing after the initial commit:

| Test | Error |
|------|-------|
| `should sign up @smoke` | `element click intercepted` - Microsoft cookie consent banner blocked click on country dropdown |
| `should subscribe @regression` | `button[type="submit"] still not clickable` - banner blocking + submit button off-screen |
| `should find support @regression` | `element not existing` - Terms link not found; missing navigation step to signup page |

---

### Root Causes

1. **Cookie consent banner** - Microsoft `wcpConsentBannerCtrl` overlay appeared on page load and intercepted clicks on elements beneath it
2. **Missing navigation step** - The Terms of Service link is on the signup page, not the main page; the test was missing `clickSignUpNavButton()` before `clickServiceTerms()`
3. **Submit button not clickable** - Button was not in viewport when `waitForClickable` was called; needed `scrollIntoView()` first

---

### Changes Made

#### `pages/base.page.js`
- Added `dismissCookieBanner()` method - removes the Microsoft consent banner from DOM via `browser.execute()`

#### `pages/signup.page.js`
- `chooseCountry()` - added `this.dismissCookieBanner()` before clicking the country dropdown

#### `pages/main.page.js`
- `finalSubscribeBtn` locator - changed to `[data-analytics-event*="form_submit"]` (more specific)
- `clickPrivacyCheckbox()` - added `this.dismissCookieBanner()` before clicking
- `clickFinalSubscribeBtn()` - added `dismissCookieBanner()` + `scrollIntoView()` before click
- `clickServiceTerms()` - added `scrollIntoView()` + `dismissCookieBanner()` before click

#### `tests/github.spec.js`
- `should find support` test - added `await SignupPage.clickSignUpNavButton()` before `clickServiceTerms()` to navigate to signup page where the Terms link is located
- `toHaveUrl` check for Terms page - changed to `{ containing: true }` with locale-neutral path; CI (Linux) opens `/en/`, local Mac opens `/ru/`
- Support page assertion - replaced `toHaveText(supportTitle)` with `toHaveUrl('support.github.com', { containing: true })`; page title is locale-dependent (Russian locally, English in CI)

#### `fixtures/testData.js`
- `termsUrl` - changed from full locale-specific URL to locale-neutral path `site-policy/github-terms/github-terms-of-service`

#### `wdio.conf.js`
- Chrome args - added `--no-sandbox` and `--disable-dev-shm-usage` (required for Linux CI)
- Chrome args - added `--window-size=1920,1080` - headless default viewport is too small, GitHub renders mobile layout with hidden nav elements
