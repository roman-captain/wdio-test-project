import { env } from '../config/env.js'

// Unique per run: GitHub signup validates email/username availability
// and password strength live - static values go stale and keep the
// "Create account" button disabled (data-disable-invalid)
const runId = Date.now()

export const testData = {
    signUp: {
        email:    `qa.rc.${runId}@gmail.com`,
        password: `Qa-R3silient-${runId}`,
        username: `qa-rc-${runId}`,
        country:  'Ukraine',
    },
    signIn: {
        email:    env.testUserEmail,
        password: env.testUserPassword,
    },
    subscribe: {
        email:   'example@gmail.com',
        country: 'Ukraine',
    },
    search: {
        query: 'art',
    },
    expectedTexts: {
        signUpHeader:      'Create your free account',
        signInTitle:       'Sign in to GitHub',
        subscribeTitle:    'Get our developer newsletter',
        successSubscribe:  'Thanks for subscribing',
        pricingHeader:     'Try GitHub, the complete developer platform',
        pricingPageTitle:  'Pricing · Plans for every developer · GitHub',
        compareFeaturesH:  'Compare features',
        termsUrl:          'site-policy/github-terms/github-terms-of-service',
    },
}
