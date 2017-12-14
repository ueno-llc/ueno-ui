module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules=1&localIdentName=[name]_[local]_[hash:base64:5]',
          'sass-loader?outputStyle=expanded',
        ],
      },
      {
        test: /\.(woff2?|svg|eot|jpe?g|png|gif|ico)$/,
        use: 'url-loader?limit=10000',
      },
    ],
  },
};
