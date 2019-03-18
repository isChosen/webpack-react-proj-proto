/*
 * @Author: liangchaoshun
 * @Date: 2019-1-25 11:42:19
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-18 10:31:55
 * @Description: Webpack Configuration Production
 */

const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.config.main.base");
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge.smart(base, {
  mode: "production",

  output: {
    publicPath: "./dist/",
    path: path.resolve(__dirname, "dist"), // 绝对路径
    filename: 'bundle/[name].bundle.[hash:4].js',
    chunkFilename: 'bundle/[name].[chunkhash:6].js'
  },
  optimization: {
    minimizer: [
      // 压缩 js
      new TerserPlugin({
        test: /\.js$/i,
        cache: path.resolve(__dirname, ".cache"),
        parallel: true
      }),
      // 压缩分离的 css
      new OptimizeCssAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorOptions: {
          discardComments: { removeAll: true }
        }
      })
    ]
  },

  plugins: [
    // 清理文件
    new CleanWebpackPlugin(["dist", ".analysis"], {exclude: ['dll']}),

    // 模板
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: '../index.html',
      title: 'Summer_cloud_pro',
      favicon: path.resolve(__dirname, 'favicon.ico'),
      template: path.resolve(__dirname, 'tmpl', 'index.pro.html')
    }),

    new CopyWebpackPlugin([
      // dll
      // 除非 react 或 react-router4 版本有变化，否则保持注释状态
      /* {
        from: "dll/*js",
        to: "",
        type: "file"
      }, */
      // static
      {
        from: "static/css/*.min.css",
        to: "",
        toType: "file"
      },
      {
        from: "static/fonts",
        to: "static/fonts",
        toType: "dir"
      },
      {
        from: "static/lib",
        to: "static/lib",
        toType: "dir"
      }
    ])
  ]
});
