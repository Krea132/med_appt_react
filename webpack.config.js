const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // instead of UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'production', 
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'server/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              esModule: false, 
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Ajusta si tu plantilla está en otro sitio
      filename: 'index.html'
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()], // compatible with Webpack 5
  },
};
