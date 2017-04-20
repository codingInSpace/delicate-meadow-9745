const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
	devtool: 'source-map',
	entry: [
		path.resolve(__dirname, 'src/index.ts')
	],
	output: {
	    path: path.resolve(ROOT_PATH, 'public'),
	    filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
	    extensions: ['.ts', '.js']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
	loaders: [{
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader',
		query: { presets: [ 'es2015' ] }
	},
	{
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
	}, 
	{
		test: /\.glsl$/,
		loader: 'webpack-glsl'
	}]
  }
};