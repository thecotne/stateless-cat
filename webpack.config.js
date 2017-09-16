const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const entry = require('webpack-glob-entry')
const R = require('ramda')

const abs = str => path.resolve(__dirname, str)

const htmlEntries = R.pipe(
  R.toPairs,
  R.map(([name, path]) => (
    new HtmlWebpackPlugin({
      title: 'Loading ...',
      filename: `${name}.html`,
      chunks: ['commons', name],
      template: 'src/js/entries/template.ejs'
    })
  ))
)

module.exports = {
  entry: entry('src/js/entries/*.js'),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: '[name]-[chunkhash].js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
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

module.exports.plugins = module.exports.plugins.concat(htmlEntries(module.exports.entry))

if (process.env.NODE_ENV !== 'production' && process.env.WEBPACK_MOD !== 'show-unused') {
  const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

  module.exports.plugins.push(
    new WebpackBuildNotifierPlugin({
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
