const path = require('path');
const dir = path.resolve(__dirname);

module.exports = {
  mode: 'development',
  entry: dir + '/src/index.tsx',
  devtool: 'eval-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.css'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
