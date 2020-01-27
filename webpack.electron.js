/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const serverConfig = merge(common, {
  mode: 'development',
  target: 'electron-main',
  entry: { electron: './electron.ts' }
})

const clientConfig = merge(common, {
  mode: 'development',
  target: 'electron-renderer',
  entry: { electron_render: './electron_render.ts' },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new HtmlWebpackPlugin({
      title: 'Electron',
      mobile: true,
      lang: 'zh-CN',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
      googleAnalytics: {
        trackingId: 'UA-93890730-1',
        pageViewOnLoad: true
      },
      favicon: './public/favicon.ico'
    }),
    new ManifestPlugin({
      filename: './public/manifest.json'
    })
  ]
})

module.exports = [serverConfig, clientConfig]
