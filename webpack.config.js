const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
  resolve: {
    extensions: ['.js', '.ts']
  },

  entry: {
    polyfills: "./src/polyfills.ts",
    main: "./src/main.ts"
  },

  output: {
    path: path.resolve(__dirname, 'dist'), // output directory
    filename: "[name].js" // name of the generated bundle
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.ts$/,
        enforce: "pre",
        loader: 'tslint-loader'
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles SASS to CSS
        }]
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
        inject: "body"
      }),

      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core/,
        path.resolve(__dirname, './src')
      ),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        Util: "exports-loader?Util!bootstrap/js/dist/util",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      })
  ],
  devtool: "source-map",
  devServer: {
    historyApiFallback: true
  }
};
