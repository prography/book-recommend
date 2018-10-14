const slsw = require("serverless-webpack");
const path = require("path"); 
const nodeExternals = require("webpack-node-externals");

module.exports = {
      entry: slsw.lib.entries,
      target: "node",
      resolve: {
	  modules: [path.resolve('./src'),'node_modules'],
      },
      devtool: 'source-map',
      externals: [nodeExternals()],
      mode: slsw.lib.webpack.isLocal ? "development" : "production",
      optimization: {

	      minimize: false
	    },
      performance: {

	      hints: false
	    },

      module: {
	      rules: [
		        {
			            test: /\.js$/,
			            loader: ["babel-loader"],
			            include: __dirname,
			            exclude: /node_modules/
			          }
		      ]
      },
      output: {
	  libraryTarget: 'commonjs',
	  path: path.join(__dirname, '.webpack'),
	  filename: '[name].js'
      },
};
