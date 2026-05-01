import { env } from '../config/env.js'

export const testData = {
    signUp: {
        email:    'example@test.com',
        password: 'Password12345',
        username: 'BraddPitt',
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
        pricingHeader:     'Try the Copilot-powered platform',
        pricingPageTitle:  'Pricing · Plans for every developer · GitHub',
        compareFeaturesH:  'Compare features',
        supportTitle:      'Приветствуем вас в службе поддержки GitHub',
        termsUrl:          'site-policy/github-terms/github-terms-of-service',
    },
}
