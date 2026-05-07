import { config as baseConfig } from './wdio.conf.js'

export const config = {
    ...baseConfig,

    specs: ['./tests/mobile/**/*.spec.js'],

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    hostname: 'hub.browserstack.com',
    port: 443,
    protocol: 'https',
    path: '/wd/hub',

    capabilities: [
        {
            browserName: 'chrome',
            'bstack:options': {
                deviceName: 'Samsung Galaxy S23',
                osVersion: '13.0',
                projectName: 'wbd-tests',
                buildName: 'browserstack-smoke',
                sessionName: 'github smoke test',
            },
        },
    ],

    services: ['browserstack'],
}
