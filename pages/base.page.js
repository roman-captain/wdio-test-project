export default class BasePage {
    async open(path = '') {
        await browser.url(path)
    }

    async dismissCookieBanner() {
        await browser.execute(() => {
            const banner = document.getElementById('wcpConsentBannerCtrl')
            if (banner) banner.remove()
        })
    }
}
