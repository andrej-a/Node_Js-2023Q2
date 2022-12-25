import path from 'path';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts?$/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};

export default ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
