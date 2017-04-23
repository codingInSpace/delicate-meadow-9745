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
	    extensions: ['.ts', '.js', '.glsl']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
	loaders: [
	{
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
	}, 
	{
		test: /\.glsl$/,
		loader: 'webpack-glsl-loader'
	}]
  }
};