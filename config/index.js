'use strict'
const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/base': {
        //target: 'http://121.36.46.3',//后端接口地址
        target: 'http://192.168.101.10:8888',//后端接口地址
        changeOrigin: true,//是否允许跨越
        pathRewrite: {
          '^/base': '/base',//重写,
        }
      },
      '/ips': {
        //target: 'http://121.36.46.3',//后端接口地址
        target: 'http://192.168.101.10:8888',//后端接口地址
        changeOrigin: true,//是否允许跨越
        pathRewrite: {
          '^/ips': '/ips',//重写,
        }
      },
      '/pss': {
        //target: 'http://121.36.46.3',//后端接口地址
        target: 'http://192.168.101.10:8888',//后端接口地址
        changeOrigin: true,//是否允许跨越
        pathRewrite: {
          '^/pss': '/pss',//重写,
        }
      },
      '/api': {
        //target: 'http://121.36.46.3',//后端接口地址
        target: 'http://localhost:8989',//后端接口地址
        changeOrigin: true,//是否允许跨越
        pathRewrite: {
          '^/api': '/api',//重写,
        }
      }

    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    proxyTable: {
      // '/office': {
      //   target: 'http://172.31.50.4:9090',//后端接口地址
      //   changeOrigin: true,//是否允许跨越
      //   pathRewrite: {
      //     '^/office': '/office',//重写,
      //   }
      // }
    },
    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
