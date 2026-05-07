export default class BaseMobilePage {
    async open(path = '') {
        await browser.url(path)
    }

    async dismissCookieBanner() {
        await browser.execute(() => {
            const msBanner = document.getElementById('wcpConsentBannerCtrl')
            if (msBanner) msBanner.remove()
        })
        try {
            const rejectBtn = $('button=Reject')
            await rejectBtn.waitForDisplayed({ timeout: 2000 })
            await rejectBtn.click()
        } catch {
            // no cookie banner present
        }
    }

    get hamburgerBtn() {
        return $('button.js-header-menu-toggle')
    }

    async openMenu() {
        await this.dismissCookieBanner()
        await this.hamburgerBtn.waitForClickable({ timeout: 10000 })
        await this.hamburgerBtn.click()
        await $('button.js-header-menu-toggle[aria-expanded="true"]').waitForExist({ timeout: 10000 })
    }
}
