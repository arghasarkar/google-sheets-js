const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/GoogleSheets.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    library: "GoogleSheets"
  },
  target: 'node',
  node: {
    __dirname: false
  },
  watch: false,
};
