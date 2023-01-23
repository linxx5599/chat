const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isDev = process.env.NODE_ENV === "development"; // 是否是开发模式
const fileEnv = `../.env.${process.env.NODE_ENV}`;
const env = require("./readEnv")(fileEnv);
module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  // 打包文件出口
  output: {
    filename: "static/js/[name].[chunkhash:8].js", // // 加上[chunkhash:8]
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/" // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "../src")],
        test: /.(ts|tsx)$/,
        use: ["thread-loader", "babel-loader"]
      },
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
            presets: [
              [
                "@babel/preset-env",
                {
                  // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                  // "targets": {
                  //  "chrome": 35,
                  //  "ie": 9
                  // },
                  useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                  corejs: 3 // 配置使用core-js低版本
                }
              ],
              "@babel/preset-react",
              "@babel/preset-typescript"
            ]
          }
        }
      },
      {
        test: /.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /.less$/, //匹配所有的 less 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]_[hash:base64:6]"
              }
            }
          },
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.svg$/,
        use: [
          "svg-sprite-loader",
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                //删除svg原本的fill属性，方便修改图标颜色
                {
                  name: "removeAttrs",
                  params: { attrs: "fill" }
                }
              ]
            }
          }
        ],
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]" // 加上[contenthash:8]
        }
      },
      {
        test: /.(png|jpg|jpeg|gif)$/, // 匹配图片文件
        use: ['file-loader'],
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]" // 加上[contenthash:8]
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体文件
        use: ['file-loader'],
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]" // 加上[contenthash:8]
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        use: ['file-loader'],
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]" // 加上[contenthash:8]
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
    alias: {
      "@": path.join(__dirname, "../src")
    },
    // 查找第三方模块只在本项目的node_modules中查找
    modules: [path.resolve(__dirname, "../node_modules")]
  },
  cache: {
    type: "filesystem" // 使用文件缓存
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        ...env
      }
    }),
    new HtmlWebpackPlugin({
      title: "聊天室",
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true // 自动注入静态资源
    })
  ]
};
