/*
 * @Author: liangchaoshun
 * @Date: 2019-1-25 11:34:34
 * @Last Modified by: liangchaoshun
 * @Last Modified time: 2019-03-08 16:19:35
 * @Description: Dll Base
 */

const os = require('os');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = env => {

  let terminal;
  const devConf = { mode: 'development' };
  const proConf = {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: os.cpus().length - 1
        })
      ]
    }
  };

  const baseConf = {
    mode: 'development',
    entry: {
      react: ['react', 'react-dom'], // 将 React 相关的模块放到一个单独的动态链表库中
      react_router: ['react-router', 'react-router-dom'] // 将 React 相关的模块放到一个单独的动态链表库中
    },
    output: {
      // 输出动态链接库的文件名称, [name] 代表当前动态链接库的名称
      // 也就是 entry 中配置的 react 和 polyfill, etc
      filename: '[name].dll.js',
      path: path.resolve(__dirname, 'dll'),
      // 存放动态链接库的全局变量名称, 例如对于 react 来说就是 _dll_react,  加上 _dll_ 防止全局变量冲突
      library: '_dll_[name]'
    },
    plugins: [
      new CleanWebpackPlugin(['dll']),
      // 接入 DllPlugin
      new webpack.DllPlugin({
        // 动态链表库的全局变量名称, 和 output.library 一致
        // 该字段的值也就是输出的 manifest.json 文件中 name 字段的值,
        // 例如在 react.manifest.json 中就有 "name": "_dll_react"
        context: __dirname,
        name: '_dll_[name]',
        // 描述动态链接库的 manifest.json 文件输出时的文件名称
        path: path.join(__dirname, 'dll', '[name].manifest.json')
      })
    ]
  }
  // 区分环境
  if (env.NODE_ENV === 'development') {
    terminal = { ...baseConf, ...devConf };
  } else {
    terminal = { ...baseConf, ...proConf };
  }
  return terminal;
};
