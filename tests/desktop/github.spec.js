import SignupPage  from '../../pages/desktop/signup.page.js'
import LoginPage   from '../../pages/desktop/login.page.js'
import MainPage    from '../../pages/desktop/main.page.js'
import { testData } from '../../fixtures/testData.js'

describe('Navigation on GitHub.com', () => {

    // GitHub protects the signup flow with Octocaptcha: automated visitors get
    // a "Verification Required" challenge instead of the form, so page content
    // is not a stable assertion. This smoke covers the entry point only.
    it('should sign up on github.com @smoke', async () => {
        await browser.url('/')

        await SignupPage.clickSignUpNavButton()

        await expect(browser).toHaveUrl('/signup', { containing: true })
    })

    it('should sign in on github.com @smoke', async () => {
        await browser.url('/')

        await LoginPage.clickSignInNavButton()

        await LoginPage.pageTitle.waitForDisplayed({ timeout: 10000 })
        await expect(LoginPage.pageTitle).toHaveText(testData.expectedTexts.signInTitle)

        await LoginPage.fillLogin(testData.signIn.email)
        await LoginPage.fillPassword(testData.signIn.password)
        await LoginPage.clickSubmit()
    })

    it('should subscribe on github.com @regression', async () => {
        await browser.url('/')

        await MainPage.scrollToSubscribeBtn()
        await expect(MainPage.subscribeBtn).toBeDisplayed()
        await expect(MainPage.subscribeBtn).toBeClickable()
        await MainPage.clickSubscribeBtn()

        await MainPage.subscribeHeadTitle.waitForDisplayed({ timeout: 10000 })
        await expect(MainPage.subscribeHeadTitle).toHaveText(testData.expectedTexts.subscribeTitle)

        await MainPage.fillEmail(testData.subscribe.email)
        await MainPage.selectCountry(testData.subscribe.country)

        await MainPage.clickPrivacyCheckbox()
        await MainPage.clickFinalSubscribeBtn()

        await MainPage.successTitle.waitForDisplayed({ timeout: 10000 })
        await expect(MainPage.successTitle).toHaveText(testData.expectedTexts.successSubscribe)
    })

    it('should search on github.com @smoke', async () => {
        await browser.url('/')

        await MainPage.clickSearch()
        await MainPage.fillSearchQuery(testData.search.query)
        await browser.keys('Enter')

        await MainPage.firstArtLink.waitForExist({ timeout: 10000 })
        await expect(MainPage.firstArtLink).toExist()
    })

    it('should check pricing on github.com @regression', async () => {
        await browser.url('/')

        await MainPage.clickPricing()

        await MainPage.pricingHeader.waitForDisplayed({ timeout: 10000 })
        await expect(MainPage.pricingHeader).toHaveText(testData.expectedTexts.pricingHeader)
        await expect(browser).toHaveTitle(testData.expectedTexts.pricingPageTitle)

        await MainPage.scrollToCompareFeaturesLink()
        await MainPage.clickCompareFeaturesLink()

        await MainPage.compareFeaturesTitle.waitForDisplayed({ timeout: 10000 })
        await expect(MainPage.compareFeaturesTitle).toHaveText(testData.expectedTexts.compareFeaturesH)
    })

    it('should find support on github.com @regression', async () => {
        await browser.url('/')

        // Route via the home footer instead of the signup page: signup sits
        // behind Octocaptcha and the challenge page has no Terms link.
        // The footer link navigates in the same tab.
        await MainPage.clickServiceTerms()

        await expect(browser).toHaveUrl(testData.expectedTexts.termsUrl, { containing: true })

        await MainPage.scrollToSupportLink()
        await MainPage.clickSupportLink()

        await expect(browser).toHaveUrl('support.github.com', { containing: true })
    })
})
