global.APP_MODE = 'default'

require('babel-polyfill')

// const Raven = require('raven-js')

// if (['example.com'].includes(location.hostname)) {
//   Raven.config('https://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@sentry.io/xxxxxx').install()
// }

require('js/index')
require('sass/index')
