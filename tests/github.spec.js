import SignupPage  from '../pages/signup.page.js'
import LoginPage   from '../pages/login.page.js'
import MainPage    from '../pages/main.page.js'
import { testData } from '../fixtures/testData.js'

describe('Navigation on GitHub.com', () => {

    it('should sign up on github.com @smoke', async () => {
        await browser.url('/')

        await SignupPage.clickSignUpNavButton()

        await SignupPage.pageHeader.waitForDisplayed({ timeout: 10000 })
        await expect(SignupPage.pageHeader).toHaveText(testData.expectedTexts.signUpHeader)

        await SignupPage.fillEmail(testData.signUp.email)
        await SignupPage.fillPassword(testData.signUp.password)
        await SignupPage.fillUsername(testData.signUp.username)
        await SignupPage.chooseCountry(testData.signUp.country)
        await SignupPage.clickEmailCheckbox()

        const createBtn = SignupPage.createAccountBtn
        await createBtn.waitForEnabled({ timeout: 10000 })
        await expect(createBtn).toBeEnabled()
        await expect(createBtn).toBeClickable()
        await createBtn.click()
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

        await SignupPage.clickSignUpNavButton()

        await MainPage.clickServiceTerms()

        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            { timeout: 10000, timeoutMsg: 'New tab did not open within 10 seconds' }
        )

        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[handles.length - 1])

        await expect(browser).toHaveUrl(testData.expectedTexts.termsUrl, { containing: true })

        await MainPage.scrollToSupportLink()
        await MainPage.clickSupportLink()

        await expect(browser).toHaveUrl('support.github.com', { containing: true })
    })
})
