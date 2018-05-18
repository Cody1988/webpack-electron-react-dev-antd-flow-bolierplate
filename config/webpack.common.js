
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

function plugins() {
  const plugins = [
    // 使用HTML模板 https://github.com/jantimon/html-webpack-plugin#third-party-addons
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname,'..','render/index.html'),
    }),
    new webpack.HashedModuleIdsPlugin()
  ];

  if (isProd) {
    plugins.push(new ExtractTextPlugin({
      filename: '[name].[chunkhash].css'
    }))
  };
  return plugins;
}
/**
 * css 文件抽离以及压缩
 */
function cssRule() {
  return {
    test: /\.css/,
    use: isProd ? ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader',
        options: {
          minimize: true,
          modules: true
        }
      }]
    }) : [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader',
      options: {
        minimize: true,
        modules: true
      }
    },{
      loader: 'less-loader',
      options: {
        javascriptEnabled: true
      }
    }
    ]
};
}

module.exports = {
  entry: {
    app: path.resolve(__dirname,'..','render/index.js')
  },
  plugins: plugins(),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'..', 'dist/render')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    {
      test: /\.less$/,
      use: [{
        loader: 'style-loader' // creates style nodes from JS strings
      }, {
        loader: 'css-loader' // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
        options: {
          javascriptEnabled: true,
        }
      }]
    },
    cssRule()
      , {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'file-loader',
      options: {
        limit: 1024
      }
    }],
  }
}







