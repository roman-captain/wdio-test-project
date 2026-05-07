import { config as baseConfig } from './wdio.conf.js'

export const config = {
    ...baseConfig,

    specs: ['./tests/mobile/**/*.spec.js'],

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
            ],
            mobileEmulation: {
                // Samsung Galaxy S20 Ultra
                deviceMetrics: { width: 412, height: 915, pixelRatio: 3.5, touch: true },
            },
        },
    }],
}
