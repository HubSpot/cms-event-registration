const CopyWebpackPlugin = require('copy-webpack-plugin');
const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');

const hubspotConfig = ({ portal, autoupload } = {}) => {
  return {
    entry: {
      'event-registration': ['whatwg-fetch', './src/index.js'],
      'upcoming-events': ['whatwg-fetch', './src/UpcomingEvents.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          include: /vendor\.js$/
        }),
      ],
      splitChunks: {
        cacheGroups: {
          commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "initial",
            },
          },
        }
      },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer({ grid: 'autoplace' })],
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'url-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HubSpotAutoUploadPlugin({
        portal,
        autoupload,
        src: 'dist',
        dest: 'event-registration',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyWebpackPlugin([
        { from: 'src/images', to: 'images' },
        { from: 'src/event.functions', to: 'event.functions', toType: 'dir' },
        {
          from: 'src/modules',
          to: 'modules',
        },
      ]),
    ],
  };
};

module.exports = [hubspotConfig];
