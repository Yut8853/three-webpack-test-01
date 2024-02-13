const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    module: true, // Add this line
  },
  experiments: {
    outputModule: true, // And this line
  },
  devServer: {
    static: './dist',
  },
  resolve: {
    extensions: ['.js', '.glsl', '.vs', '.fs','.vert', '.frag','.scss','.sass','.css'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]'
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ['raw-loader', 'glslify-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true,
      chunksSortMode: 'auto',
      scriptLoading: 'defer',
      type: 'module', // add this line
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
  ],
};
