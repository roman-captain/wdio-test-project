import { env } from './config/env.js'

export const config = {
    runner: 'local',

    specs: ['./tests/**/*.spec.js'],
    exclude: [],

    maxInstances: 1,

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--window-size=1920,1080',
                ...(env.headless ? ['--headless', '--disable-gpu'] : []),
            ],
        },
    }],

    logLevel: 'warn',

    baseUrl: env.baseUrl,

    waitforTimeout: env.defaultTimeout,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

}
