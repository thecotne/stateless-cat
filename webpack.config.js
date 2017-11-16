const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const abs = str => path.resolve(__dirname, str)

module.exports = {
  entry: 'src/js/index.js',
  output: {
    path: abs('public'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      abs('node_modules'),
      abs('src/js'),
      abs('src/sass'),
      abs('src'),
      abs('.')
    ],
    extensions: ['.js', '.json', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.(mp4|mp3|jpe?g|png|gif|swf|ttf|eot|svg|woff2?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        query: {
          name: '[name]-[hash].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'resolve-url-loader',
            'sass-loader?sourceMap',
            'postcss-loader?sourceMap',
            'import-glob-loader'
          ],
          publicPath: ''
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style-[chunkhash].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Loading ...',
      filename: 'index.html',
      template: 'src/js/template.ejs'
    })
  ],
  devServer: {
    contentBase: abs('public'),
    historyApiFallback: true,
    host: 'localhost',
    port: 8080
  },
  devtool: false
}

if (process.env.NODE_ENV !== 'production' && process.env.WEBPACK_MOD !== 'show-unused') {
  const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

  module.exports.plugins.push(
    new WebpackBuildNotifierPlugin({
      onClick (notifierObject, options) {},
      sound: 'Tink',
      suppressSuccess: true
    })
  )
}

if (process.env.WEBPACK_MOD === 'show-unused') {
  const {UnusedFilesWebpackPlugin} = require('unused-files-webpack-plugin')

  module.exports.stats = 'minimal'
  module.exports.plugins.push(
    new UnusedFilesWebpackPlugin({
      pattern: 'src/**/*.*'
    })
  )
}
