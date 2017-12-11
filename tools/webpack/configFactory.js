import { resolve as resolvePath } from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import appRootDir from 'app-root-dir';
import { getPackageJson, removeEmpty, ifElse } from '../utils';

function webpackConfigFactory({ target }) {
  const libraryName = getPackageJson().name;
  const minimize = target === 'umd-min';

  return {
    entry: {
      index: resolvePath(appRootDir.get(), './src/index.js'),
    },
    output: {
      path: resolvePath(appRootDir.get(), './umd'),
      filename: target === 'umd'
        ? `${libraryName}.js`
        : `${libraryName}.min.js`,
      library: libraryName,
      libraryTarget: 'umd',
    },
    externals: {
      react: 'React',
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),

      new ExtractTextPlugin({
        filename: 'css/[name].css',
        disable: false,
        allChunks: true,
      }),

      new webpack.LoaderOptionsPlugin({
        minimize,
      }),

      ifElse(minimize)(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
          },
          mangle: {
            screw_ie8: true,
          },
          output: {
            comments: false,
            screw_ie8: true,
          },
        }),
      ),
    ]),
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolvePath(appRootDir.get(), './src')],
        },
        {
          test: /\.css|\.scss|\.sass$/,
          include: [resolvePath(appRootDir.get(), './src')],
          use: [
            ...ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                'css-loader?modules=1&localIdentName=[hash:base64:16]',
                'postcss-loader',
                'sass-loader?outputStyle=expanded',
              ],
            }),
          ],
        }
      ],
    },
  };
}

module.exports = webpackConfigFactory;
