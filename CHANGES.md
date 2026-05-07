# CHANGES

## feat: add mobile test layer with BrowserStack support

**Date:** 2026-05-07
**Status:** 5/5 mobile tests passing (local emulation) + BrowserStack workflow ready

---

### What was added

Full mobile testing layer alongside existing desktop suite.

---

### Project structure change

Desktop tests moved into subfolders to separate from mobile:

```
pages/desktop/   - existing POM files (moved from pages/)
pages/mobile/    - new mobile POM files
tests/desktop/   - existing spec (moved from tests/)
tests/mobile/    - new mobile spec with @mobile tag
```

---

### Mobile vs Desktop differences

| Element | Desktop selector | Mobile selector | Reason |
|---------|-----------------|-----------------|--------|
| Hamburger btn | - | `button.js-header-menu-toggle` | Mobile nav hidden behind hamburger |
| Sign Up | `.HeaderMenu-link--sign-up` | same + `openMenu()` first | Hidden until hamburger opened |
| Sign In | `.HeaderMenu`>`a[href="/login"]` | `a[href="/login"]` | Always visible on mobile |
| Search | `button.header-search-button` | `button[aria-label="Search or jump to..."]` + `openMenu()` | Different selector on mobile |
| Pricing btn | `span=Pricing` | `a[href="https://github.com/pricing"]` + `openMenu()` | Different element on mobile |
| Compare features | `h1.h1` | `.js-compare-features-selected` | No h1 heading on mobile pricing page |
| Country dropdown | `span=Ukraine` | filter input + `span.ActionListItem-label` | Custom panel with search on mobile |

---

### New files

- `pages/mobile/base.mobile.page.js` - hamburger open/close + dismissCookieBanner
- `pages/mobile/signup.mobile.page.js` - signup + login form interactions
- `pages/mobile/login.mobile.page.js` - sign in navigation
- `pages/mobile/main.mobile.page.js` - search, pricing, subscribe
- `tests/mobile/github.mobile.spec.js` - 5 mobile scenarios tagged @mobile
- `wdio.mobile.local.conf.js` - Chrome mobileEmulation config (Samsung Galaxy S20 Ultra, 412px) for local development
- `browserstack.conf.js` - BrowserStack config (Samsung Galaxy S23) for real device runs
- `.github/workflows/browserstack.yml` - manual-only GitHub Actions workflow for BrowserStack runs

---

### Known issues

- `should subscribe @mobile` - occasional `element click intercepted` warning on Subscribe button; WDIO retries automatically, test passes
- `browser.pause(500)` added in `chooseCountry()` - country dropdown panel requires animation time before filter input is accessible

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

#### `pages/main.page.js` + `fixtures/testData.js`
- Removed unused `supportTitle` locator and test data value - no longer referenced after switching to URL assertion

#### `wdio.conf.js`
- Chrome args - added `--no-sandbox` and `--disable-dev-shm-usage` (required for Linux CI)
- Chrome args - added `--window-size=1920,1080` - headless default viewport is too small, GitHub renders mobile layout with hidden nav elements
