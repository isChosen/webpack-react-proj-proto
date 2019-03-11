/*
 * @Author: liangchaoshun
 * @Date: 2018-11-01 12:16:57
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-11 20:03:32
 * @Description: Webpack Configuration Development
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const base = require('./webpack.config.main.base');
const Mock = require('./mocks/mockConf');

module.exports = env => merge.smart(base, {
  mode: 'development',
  devtool: 'eval-source-map',

  output: {
    filename: 'bundle/[name].bundle[hash:6].js',
    chunkFilename: 'bundle/[name].[chunkhash:6].js'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      }
    ]
  },

  devServer: {
    hot: true,
    port: 8052,
    https: false,
    compress: true,
    progress: true,
    open: 'Chrome',
    host: '0.0.0.0',
    useLocalIp: true,
    clientLogLevel: 'error',
    contentBase: __dirname,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://10.1.1.100:8024', // 本地 node server 接口
        pathRewrite: { '^/api': '' }
      },
      '/v1/web': {
        target: 'https://100.100.100.10', // url 会自动补全：https://100.100.100.10/v1/web
        secure: false // inclusion https
      }
    },
    before: (app, server) => {
      Mock(app); // 静态 mock data
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新

    // 模板
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      title: 'Summer_cloud_dev',
      favicon: __dirname + '/favicon.ico',
      template: __dirname + '/tmpl/index.dev.html'
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    })

    /* 
    // 输出分析
    new BundleAnalyzerPlugin({
      analyzerPort: 2019,
      generateStatsFile: true,
      statsFilename: '../analysis/stats.json'
    })
    */
  ]
})
