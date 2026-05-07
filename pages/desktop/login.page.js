import BasePage from './base.page.js'

class LoginPage extends BasePage {

    // SignIn locators

    get signInNavButton() { return $('.HeaderMenu').$('a[href="/login"]') }
    get pageTitle()       { return $('//h1[normalize-space()="Sign in to GitHub"]') }
    get loginField()      { return $('#login_field') }
    get passwordField()   { return $('#password') }
    get submitButton()    { return $('[value="Sign in"]') }

    // SignIn actions

    async clickSignInNavButton() {
        await this.signInNavButton.waitForClickable({ timeout: 10000 })
        await this.signInNavButton.click()
    }

    async fillLogin(value) {
        await this.loginField.waitForDisplayed({ timeout: 10000 })
        await this.loginField.setValue(value)
    }

    async fillPassword(value) {
        await this.passwordField.waitForDisplayed({ timeout: 10000 })
        await this.passwordField.setValue(value)
    }

    async clickSubmit() {
        await this.submitButton.waitForClickable({ timeout: 10000 })
        await this.submitButton.click()
    }
}

export default new LoginPage()
