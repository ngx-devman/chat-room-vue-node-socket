const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'http://localhost:3000/',
  //       changeOrigin: true,
  //     }
  //   },
  //   cors: {
  //     origin: true
  //   }
  // }
})
