const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    pathinfo: false,
  },
  devtool: process.env.NODE_ENV !== 'production' && 'cheap-module-source-map', // Генерация sourcemap
  devServer: {
    port: '8080', // Порт
    compress: false, // Сжатие
    open: true, // Открытие при страте
    hot: true, // Горячая перезагрузка◘
    liveReload: true, // Живая перезагрузка
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/, // Какие файлы преобразовывать
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ], // Лоадеры
        exclude: [/node_modules/, /build/],
      },
      {
        test: /(\.scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
        exclude: [/node_modules/, /build/],
      },
      {
        test: /(\.css)$/,
        // include: ['node_modules/antd/dist'],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  /* optimization: {
    runtimeChunk: true,
  }, */
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
    }),
    new EslintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
  ],
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // Режим сброки (development | production, в нашем случае передаётся при запуске скрипта (--node-env=production))
};
