export const env = {
    baseUrl:        process.env.BASE_URL      || 'https://github.com',
    defaultTimeout: Number(process.env.TIMEOUT) || 10000,
    headless:       process.env.HEADLESS === 'true',
    testUserEmail:  process.env.TEST_USER_EMAIL    || '',
    testUserPassword: process.env.TEST_USER_PASSWORD || '',
}
