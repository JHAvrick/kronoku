var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'app');
var BUILD_DIR = path.resolve(__dirname, 'build');

module.exports = {
			name: "kronoku",
			
			entry: path.resolve(APP_DIR, 'app.jsx'),
			
			output: {
					path: BUILD_DIR,
					filename: 'bundle.js',
			},

			plugins: [new UglifyJSPlugin()],

			module : {
				loaders : [{
					test : /\.jsx?/,
					include : [APP_DIR],
					loader : 'babel-loader'
				}]
			},

			resolve: {
				alias: {
					base: path.resolve(__dirname, 'app/components/base'),
					comp: path.resolve(__dirname, 'app/components/comp'),
					page: path.resolve(__dirname, 'app/components/page'),
					controller: path.resolve(__dirname, 'app/controller')
				}
			}
	};
