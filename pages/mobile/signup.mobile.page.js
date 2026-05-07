import BaseMobilePage from './base.mobile.page.js'

class SignupMobilePage extends BaseMobilePage {

    get signUpNavButton() { return $('.HeaderMenu-link--sign-up') }
    get pageHeader() { return $('h1.signups-rebrand__container-h1') }
    get emailField() { return $('#email') }
    get passwordField() { return $('#password') }
    get usernameField() { return $('#login') }
    get countryDropdown()  { return $('#country-dropdown-panel-button') }
    get countryFilter()    { return $('#country-dropdown-panel-filter') }
    get emailCheckbox() { return $('.FormControl-checkbox') }
    get createAccountBtn() { return $('button[data-target="signup-form.SignupButton"]') }

    async clickSignUpNavButton() {
        await this.openMenu()
        await this.signUpNavButton.waitForClickable({ timeout: 10000 })
        await this.signUpNavButton.click()
    }

    async fillEmail(value) {
        await this.emailField.waitForDisplayed({ timeout: 10000 })
        await this.emailField.setValue(value)
    }

    async fillPassword(value) {
        await this.passwordField.waitForDisplayed({ timeout: 10000 })
        await this.passwordField.setValue(value)
    }

    async fillUsername(value) {
        await this.usernameField.waitForDisplayed({ timeout: 10000 })
        await this.usernameField.setValue(value)
        await browser.execute(() => document.activeElement.blur())
        await browser.pause(500)
    }

    async chooseCountry(name) {
        await browser.execute(() => document.activeElement.blur())
        await browser.pause(1000)
        await this.dismissCookieBanner()
        await this.countryDropdown.waitForDisplayed({ timeout: 10000 })
        await this.countryDropdown.scrollIntoView()
        await this.countryDropdown.waitForClickable({ timeout: 10000 })
        await this.countryDropdown.click()
        await this.countryFilter.waitForDisplayed({ timeout: 10000 })
        await this.countryFilter.setValue(name)
        const option = $('button[data-value="UA"]')
        await option.waitForDisplayed({ timeout: 10000 })
        await option.click()
        if (await this.countryFilter.isDisplayed()) {
            await $('[data-close-dialog-id="country-dropdown-panel-dialog"]').click()
        }
    }

    async clickEmailCheckbox() {
        await this.dismissCookieBanner()
        await this.emailCheckbox.scrollIntoView()
        await this.emailCheckbox.waitForClickable({ timeout: 10000 })
        await this.emailCheckbox.click()
    }
}

export default new SignupMobilePage()
