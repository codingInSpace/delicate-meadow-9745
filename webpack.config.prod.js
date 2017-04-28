const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
	devtool: '',
	entry: [
		path.resolve(__dirname, 'src/index.js')
	],
	output: {
	    path: path.resolve(ROOT_PATH, 'public'),
	    filename: 'bundle.js',
	    library: 'violetrose',
	    libraryTarget: 'umd',
			publicPath: '/'
	},
	resolve: {
	    extensions: ['.js', '.glsl']
	},
	plugins: [
		new webpack.DefinePlugin({
				'process.env': {NODE_ENV: '"production"' },
		}),
		new webpack.optimize.UglifyJsPlugin(),
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
