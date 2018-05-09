
const path = require('path');
const {spawn} = require('child_process');

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const port = process.env.PORT || 10240;
const publicPath = `http://localhost:${port}`;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port,
    publicPath,
    open: false,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, '..', 'app/dist/'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false
    },
    before() {
      if (process.env.START_HOT) {
        spawn(
          'npm',
          ['run', 'start-electron'],
          { shell: true, env: process.env, stdio: 'inherit' }
        )
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError))
      }
    }
  },
});







