import BasePage from './base.page.js'

class SignupPage extends BasePage {

    // Signup Locators

    get signUpNavButton() { return $('.HeaderMenu-link--sign-up') }
    get pageHeader() { return $('h1.signups-rebrand__container-h1') }
    get emailField() { return $('#email') }
    get passwordField() { return $('#password') }
    get usernameField() { return $('#login') }
    get countryDropdown() { return $('#country-dropdown-panel-button') }
    get emailCheckbox() { return $('.FormControl-checkbox') }
    get createAccountBtn() { return $('button[data-target="signup-form.SignupButton"]') }

    // Signup actions

    async clickSignUpNavButton() {
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
    }

    async chooseCountry(name) {
        await this.dismissCookieBanner()
        await this.countryDropdown.waitForClickable({ timeout: 10000 })
        await this.countryDropdown.click()
        const option = await $(`span=${name}`)
        await option.waitForDisplayed({ timeout: 10000 })
        await option.click()
    }

    async clickEmailCheckbox() {
        await this.emailCheckbox.waitForClickable({ timeout: 10000 })
        await this.emailCheckbox.click()
    }
}

export default new SignupPage()
