const path = require('path');

module.exports = {
  entry: './src/index.js', // File chính của ứng dụng
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',  // Để bật source map cho mã nguồn của bạn
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,  // Bỏ qua các lỗi từ node_modules
      },
    ],
  },
};
