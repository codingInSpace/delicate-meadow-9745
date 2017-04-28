const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
	devtool: 'source-map',
	entry: [
		path.resolve(__dirname, 'src/index.js')
	],
	output: {
	    path: path.resolve(ROOT_PATH, 'public'),
	    filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
	    extensions: ['.js', '.glsl']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoEmitOnErrorsPlugin()
	],
	module: {
	loaders: [
	{
        test: /\.js$/,
        exclude: /node_modules/,
				loader: 'babel-loader?presets[]=es2015'
	}, 
	{
		test: /\.glsl$/,
		loader: 'webpack-glsl-loader'
	}]
  }
};
