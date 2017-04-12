// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],

  module: {
    loaders: [
      // add your custom loaders.
      {
        test: /.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader?modules=1&localIdentName=[name]_[local]_[hash:base64:5]',
          'sass-loader?outputStyle=expanded',
        ],
      },
      {
        test: /\.(woff2?|svg|eot|jpe?g|png|gif|ico)$/,
        loader: 'url?limit=10000',
      },
    ],
  },
};
