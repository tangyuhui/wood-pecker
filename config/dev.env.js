var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://192.168.6.72:8038"',
  FRONT_URL_ROOT:'"http://localhost:8080"'
})
