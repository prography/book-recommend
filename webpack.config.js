global.fetch = require('node-fetch')
const slsw = require("serverless-webpack");
const path = require("path"); 
const nodeExternals = require("webpack-node-externals");

module.exports = {
      entry: slsw.lib.entries,
      target: "node",
      resolve: {
	  modules: [path.resolve('./src')],
      },
      mode: slsw.lib.webpack.isLocal ? "development" : "production",
      optimization: {

	      minimize: false
	    },
      performance: {

	      hints: false
	    },
      externals: [nodeExternals()],
      module: {
	      rules: [
		        {
                    test: /\.js$/,
                    loader: ["babel-loader"],
                    include: __dirname
                  }
		      ]
      },
     output: {
        libraryTarget: 'commonjs',
        path: path.resolve(__dirname, '.webpack'),
        filename: '[name].js',
      }
};
