import 'dotenv/config'

export const projectRootPath = __dirname

const environments = {
    qa16: {
        baseUrl: 'https://mycelium-qa16.website.staging.corp.mongodb.com/',
        username: process.env.DEV_TAF_USERNAME,
        password: process.env.DEV_TAF_PASSWORD,
    },
    qa12: {
        baseUrl: 'https://mycelium-qa12.website.staging.corp.mongodb.com/',
        username: process.env.DEV_TAF_USERNAME,
        password: process.env.DEV_TAF_PASSWORD,
    },
    dev: {
        baseUrl: 'https://mycelium-dev.website.staging.corp.mongodb.com/',
        username: process.env.DEV_TAF_USERNAME,
        password: process.env.DEV_TAF_PASSWORD,
    },
    stage: {
        baseUrl: 'https://mycelium-staging.website.staging.corp.mongodb.com/',
        username: process.env.DEV_TAF_USERNAME,
        password: process.env.DEV_TAF_PASSWORD,
    },
    // prod: {
    //     url: 'https://mycelium-qa12.website.staging.corp.mongodb.com/vf-hero-video-vimeo',
    //     username: process.env.PROD_TAF_USERNAME,
    //     password: process.env.PROD_TAF_PASSWORD,
    // },


}

export const config = environments[process.env.TEST_ENV as keyof typeof environments] || environments.qa
