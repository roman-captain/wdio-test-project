export default class BaseMobilePage {
    async open(path = '') {
        await browser.url(path)
    }

    async dismissCookieBanner() {
        await browser.execute(() => {
            const banner = document.getElementById('wcpConsentBannerCtrl')
            if (banner) banner.remove()
        })
    }

    get hamburgerBtn() {
        return $('button.js-header-menu-toggle')
    }

    async openMenu() {
        await this.hamburgerBtn.waitForClickable({ timeout: 10000 })
        await this.hamburgerBtn.click()
    }
}
