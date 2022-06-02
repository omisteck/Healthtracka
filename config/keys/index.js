require('dotenv').config({})

if (process.env.APP_ENV === 'production') {
  module.exports = require('./prod')
} else if (process.env.APP_ENV === 'staging') {
  module.exports = require('./staging')
} else {
  module.exports = require('./dev')
}
