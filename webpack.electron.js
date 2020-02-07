/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const mainConfig = merge(common, {
	mode: 'development',
	target: 'electron-main',
	entry: { main: './src/electron/main.ts' }
});

const preloadConfig = merge(common, {
	mode: 'development',
	target: 'electron-preload',
	entry: { preload: './src/electron/preload.ts' }
});

const rendererConfig = merge(common, {
	mode: 'development',
	target: 'electron-renderer',
	entry: { renderer: './src/electron/renderer.tsx' },
	plugins: [
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
});

module.exports = [mainConfig, preloadConfig, rendererConfig];
