require('dotenv').config({})

module.exports = {
    ENVIRONMENT : process.env.APP_ENV,
    IPGEOLOCATION_API_TOKEN : process.env.IPGEOLOCATION_TEST_API_TOKEN,
}