import BaseMobilePage from './base.mobile.page.js'

class MainMobilePage extends BaseMobilePage {

    // Subscribe locators
    get subscribeBtn()        { return $('a[href="https://github.com/newsletter"]') }
    get subscribeHeadTitle()  { return $('h1=Get our developer newsletter') }
    get emailField()          { return $('#form-field-emailAddress') }
    get countrySelect()       { return $('#form-field-country') }
    get privacyCheckbox()     { return $('[viewBox="0 0 100 100"]') }
    get successTitle()        { return $('#hero-section-brand-heading') }
    get finalSubscribeBtn()   { return $('[data-analytics-event*="form_submit"]') }

    // Search locators
    get searchButton()        { return $('button[aria-label="Search or jump to…"]') }
    get searchInput()         { return $('#query-builder-test') }
    get firstArtLink()        { return $('*=art') }

    // Pricing locators
    get pricingButton()       { return $('a[href="https://github.com/pricing"]') }
    get pricingHeader()       { return $('h1.h2-mktg') }
    get compareFeaturesLink() { return $('a[href="#compare-features"]') }
    get compareFeaturesTitle(){ return $('.js-compare-features-selected') }

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
        await this.privacyCheckbox.waitForClickable({ timeout: 10000 })
        await this.privacyCheckbox.click()
    }

    async clickFinalSubscribeBtn() {
        await this.finalSubscribeBtn.waitForExist({ timeout: 10000 })
        await this.finalSubscribeBtn.scrollIntoView()
        await this.finalSubscribeBtn.click()
    }

    // Search actions

    async clickSearch() {
        await this.openMenu()
        await this.searchButton.waitForClickable({ timeout: 10000 })
        await this.searchButton.click()
    }

    async fillSearchQuery(value) {
        await this.searchInput.waitForDisplayed({ timeout: 10000 })
        await this.searchInput.setValue(value)
    }

    // Pricing actions

    async clickPricing() {
        await this.openMenu()
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
}

export default new MainMobilePage()
