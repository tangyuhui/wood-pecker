var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"https://safes.test.cfpamf.com"',
  FRONT_URL_ROOT:'"http://localhost:8080"'
})
