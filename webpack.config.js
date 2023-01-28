'use strict';
const path = require('path');

const PATHS = require('./paths');
const { IS_PRODUCTION } = require('./env');

const entryPoints = {
	bundle: path.resolve(__dirname, PATHS.src.jsEntryPoint),
};

module.exports = {
	entry: Object.keys(entryPoints).reduce((acc, currentKey) => {
		acc[currentKey] = [entryPoints[currentKey]];
		return acc;
	}, {}),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, PATHS.build.js),
		publicPath: '/js',
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: 'babel-loader',
			},
		],
	},
	devtool: IS_PRODUCTION ? undefined : 'eval',
	mode: IS_PRODUCTION ? 'production' : 'development',
	optimization: {
		minimize: IS_PRODUCTION,
	},
};
