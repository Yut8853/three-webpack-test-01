const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const path = require('path');



module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devServer: {
    static: './dist',
  },
  resolve: {
    extensions: ['.js', '.glsl', '.vs', '.fs','.vert', '.frag','.scss','.sass','.css'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'), // パスの別名を設定します
    },
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // CSS
      {
        test: /\.(sass|scss|css)$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
      {
        //拡張子がsvgを検知したら
        test: /\.(png|jpeg|jpg|gif|svg|eot|ttf|woff|woff2|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      // Javascript
      {
        test: /\.js$/,
        // node_modulesは対象外
        exclude: /node_modules/,
        // トランスコンパイラ
        use: ['babel-loader'],
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
          {
            loader: 'glslify-loader',
            options: {
              transform: [
                'glslify-hex'
              ]
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: true,
      chunksSortMode: 'auto',
      scriptLoading: 'defer',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
    }),
  ],
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          filename: "[name][ext]",
          options: {
            encodeOptions: {
              /* 各種libSquooshのオプション設定 */
              mozjpeg: {
                quality: 70,
              },
            },
          },
        },
      }),
    ],
  },
};
