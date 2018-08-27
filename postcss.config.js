module.exports = {
    plugins:  [
      require('postcss-easy-import')({
        extensions: ['pcss', 'css']
      }),
      require('postcss-theme-variables')({
        vars: {
          red: '#f25643',
          green:'#15bc83',
          'border-color':'#dcdddd',
          gray: '#CCC',
          blue: '#3296fa',
          'button-primary-background-color': '#3296fa',
          'button-primary-border-color': '#3296fa'
        },
        prefix: '$'
      }),
      require('precss')(),
      require('postcss-calc')(),
      require('autoprefixer')({
        browsers: ['Android >= 4.0', 'iOS >= 7']
      })
    ]   
      // 'postcss-pxtorem': {
      //   rootValue: 75,
      //   propList: ['*']
      // }
  }