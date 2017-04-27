const webpack = require('webpack');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
	devtool: '',
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
		new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
	    new webpack.DefinePlugin({
	        'process.env': {NODE_ENV: '"production"' },
	    }),
	    new webpack.optimize.UglifyJsPlugin(),
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