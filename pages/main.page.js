import BasePage from './base.page.js'

class MainPage extends BasePage {

    // Subscribe locators

    get subscribeBtn()       { return $('a[href="https://github.com/newsletter"]') }
    get subscribeHeadTitle() { return $('h1=Get our developer newsletter') }
    get emailField()         { return $('#form-field-emailAddress') }
    get countrySelect()      { return $('#form-field-country') }
    get privacyCheckbox()    { return $('[viewBox="0 0 100 100"]') }
    get successTitle()       { return $('#hero-section-brand-heading') }
    get finalSubscribeBtn()  { return $('[data-analytics-event*="form_submit"]') }

    // Subscribe actions

    async scrollToSubscribeBtn() {
        await this.subscribeBtn.waitForExist({ timeout: 10000 })
        await this.subscribeBtn.scrollIntoView()
    }

    async clickSubscribeBtn() {
        await this.subscribeBtn.waitForClickable({ timeout: 10000 })
        await this.subscribeBtn.click()
    }

    async fillEmail(value) {
        await this.emailField.waitForDisplayed({ timeout: 10000 })
        await this.emailField.setValue(value)
    }

    async selectCountry(countryName) {
        await this.countrySelect.waitForDisplayed({ timeout: 10000 })
        await this.countrySelect.selectByVisibleText(countryName)
    }

    async clickPrivacyCheckbox() {
        await this.dismissCookieBanner()
        await this.privacyCheckbox.waitForClickable({ timeout: 10000 })
        await this.privacyCheckbox.click()
    }

    async clickFinalSubscribeBtn() {
        await this.dismissCookieBanner()
        await this.finalSubscribeBtn.waitForExist({ timeout: 10000 })
        await this.finalSubscribeBtn.scrollIntoView()
        await this.finalSubscribeBtn.click()
    }

    // Search locators

    get searchButton() { return $('button.header-search-button') }
    get searchInput()  { return $('#query-builder-test') }
    get firstArtLink() { return $('*=art') }

    // Search actions

    async clickSearch() {
        await this.searchButton.waitForClickable({ timeout: 10000 })
        await this.searchButton.click()
    }

    async fillSearchQuery(value) {
        await this.searchInput.waitForDisplayed({ timeout: 10000 })
        await this.searchInput.setValue(value)
    }

    // Pricing locators

    get pricingButton()      { return $('span=Pricing') }
    get pricingHeader()      { return $('h1.h2-mktg') }
    get compareFeaturesLink(){ return $('a[href="#compare-features"]') }
    get compareFeaturesTitle(){ return $('h1.h1') }

    // Pricing actions

    async clickPricing() {
        await this.pricingButton.waitForClickable({ timeout: 10000 })
        await this.pricingButton.click()
    }

    async scrollToCompareFeaturesLink() {
        await this.compareFeaturesLink.waitForExist({ timeout: 10000 })
        await this.compareFeaturesLink.scrollIntoView()
    }

    async clickCompareFeaturesLink() {
        await this.compareFeaturesLink.waitForClickable({ timeout: 10000 })
        await this.compareFeaturesLink.click()
    }

    // Support / Terms locators

    get serviceTermsButton() { return $('a[href*="/site/terms"]') }
    get supportLink()        { return $('a[href="https://support.github.com/"]') }
    get supportTitle()       { return $('h2[class*="Heading-module__Heading"]') }

    // Support / Terms actions 

    async clickServiceTerms() {
        await this.serviceTermsButton.waitForExist({ timeout: 10000 })
        await this.serviceTermsButton.scrollIntoView()
        await this.dismissCookieBanner()
        await this.serviceTermsButton.waitForClickable({ timeout: 10000 })
        await this.serviceTermsButton.click()
    }

    async scrollToSupportLink() {
        await this.supportLink.waitForExist({ timeout: 10000 })
        await this.supportLink.scrollIntoView()
    }

    async clickSupportLink() {
        await this.supportLink.waitForClickable({ timeout: 10000 })
        await this.supportLink.click()
    }
}

export default new MainPage()
