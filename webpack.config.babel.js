var buildStylesLoader = require('build-styles-loader');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs-extra');

// 目录
let rootDir = path.resolve(__dirname);
let srcDir = path.join(rootDir, 'src');
let distDir = path.join(rootDir, 'public');

// 环境变量，buildStylesLoader 需要，它会根据不同的环境生成不同的配置
var nodeEnv = process.env.NODE_ENV || 'development';
var env = {
  DEV: /dev/i.test(nodeEnv),
  BUILD: /(build|prod)/i.test(nodeEnv),
  DEBUG: /debug/i.test(nodeEnv),
  TEST: /test/i.test(nodeEnv)
}

// 每次编译都清除上一次编译的结果
if (env.BUILD) fs.emptyDirSync(distDir);

var alias = {
  'react$': require.resolve('react/dist/react.min'),
  'react-dom$': require.resolve('react-dom/dist/react-dom.min'),
  'elegant-api$': require.resolve('elegant-api/dist/elegant-api.min')
};

// loaders 需要的一些配置
var config = {
  ExtractTextPlugin: require('extract-text-webpack-plugin'), // 必传的一个属性
  sass: {includePaths: srcDir}
}

var wp = {
  meta: {
    env: env
  },
  debug: env.DEV || env.DEBUG,
  devtool: env.TEST || env.BUILD ? 'source-map' : 'eval',
  resolve: {
    root: srcDir,
    alias: env.DEV ? {} : alias
  },
  entry: {
    vendors: path.join(srcDir, 'vendors.js'),
    index: path.join(srcDir, 'index.js')
  },
  output: {
    path: distDir,
    publicPath: env.BUILD ? './' : `http://0.0.0.0:8080/`,
    filename: env.BUILD ? '[name].[hash:8].js' : '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin(Object.keys(env).reduce((res, k) => {
      res['__' + k + '__'] = JSON.stringify(env[k]);
      return res;
    }, {})),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: ['index', 'vendors'], minChunks: Infinity}),

    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: srcDir,
    historyApiFallback: true,
    port: 8080,
    host: '0.0.0.0',
    stats: {
      version: true,
      timings: true,
      cached: false,
      colors: true,
      modules: false,
      chunks: false,
      chunkModules: false,
      errorDetails: true
    }
  }
}

module.exports = buildStylesLoader(wp, env, config);

