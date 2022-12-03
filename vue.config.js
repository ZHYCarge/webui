const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
publicPath:'./',
  devServer: {
    https: false,
    proxy: {
      '/api': {
        target: 'http://api.zhycarge.top',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  }
})
