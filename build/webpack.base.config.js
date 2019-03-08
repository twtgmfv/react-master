const Webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//webpack4提取样式到单独文件,并且进行压缩，配合下面两个插件使用

const path = require('path');
let isDev = process.env.ENV === 'development';
console.log('base-isDev:::', process.env.ENV);

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: "js/[name].js"
    },
    resolve: {
        alias:{
            "@":path.resolve(__dirname,'../src')
        },
        extensions: ['.js','.jsx']
    },
    externals: {
        // 'react':'react',
        // 'react-dom':'react-dom'
    },
    module: {
        rules: [
            {
                test: /\.j(s|sx)$/,
                // exclude: /node_modules/,
                include: [path.resolve(__dirname, '../src'), /@jianlc/],
                // include: /jianlc/,
                use: [
                    'cache-loader',
                    {
                        loader: 'babel-loader',
                        // 开启缓存功能
                        options: {
                            cacheDirectory: true,
                            // configFile: path.resolve(__dirname, '../babel.config.js')
                        }
                    }

                ]
            },
            {
                test: /\.s?[ac]ss$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                            localIdentName: '[name]-[hash:base64:5]',
                        }
                    },
                    'sass-loader',
                    {
                        loader: "postcss-loader", //将 CSS 解析成抽象语法树
                        options: {
                            plugins: [
                                require('autoprefixer')({  //postcss是一个平台，我们能够开发一些插件，来处理我们的CSS
                                    browsers: ['last 2 version']
                                })
                            ]
                        }
                    }
                ]
            },
            //image
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                        name: '[path][name].[ext]?[hash:8]',
                        outputPath: function (path) {
                            return path
                        },
                        publicPath: function (path) {
                            return path
                        }
                    }
                }]
                    .concat(!isDev ? [ //图片压缩
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                gifsicle: {
                                    interlaced: false,
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4
                                },
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                }
                            }
                        }
                    ] : [])
            },
            //字体
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 2000, // 小于8k的字体自动转成base64格式，并且不会存在实体字体
                        name: '[path][name].[ext]?[hash:8]', //./fonts/Aileron-Thin.otf
                        outputPath: function (path) {
                            return path
                        },
                        publicPath: function (path) {
                            return path
                        }
                    }
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: "initial",
            name: 'vendors',
            cacheGroups: {
                tools: {
                    name: 'tools',
                    test: /jianlc/,
                    minChunks: 1,
                    minSize: 0,
                    priority: 10,
                    reuseExistingChunk: true
                },
                styles: {
                    name: 'styles',
                    test: /\.scss|css$/,
                    chunks: "all",
                    enforce: true
                }

                // // default: false,
                // styles: {
                //     name: 'common',
                //     test: /\.scss|css$/,
                //     chunks: 'initial',
                //     // 不生成公共样式文件
                //     minChunks: 999999,
                //     enforce: true
                // }
            }
        },

    },
    // optimization: {
    //     minimize: !isDev, // 开发环境不压缩
    //     splitChunks: {
    //         chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
    //         minSize: 30000, // 模块超过30k自动被抽离成公共模块
    //         minChunks: 1, // 模块被引用>=1次，便分割
    //         maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
    //         maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
    //         name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
    //         automaticNameDelimiter: '~', // 命名分隔符
    //         cacheGroups: { // 缓存组，会继承和覆盖splitChunks的配置
    //             default: { // 模块缓存规则，设置为false，默认缓存组将禁用
    //                 minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
    //                 priority: -20, // 优先级
    //                 reuseExistingChunk: true, // 默认使用已有的模块
    //             },
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
    //                 priority: -10
    //             }
    //         }
    //     }
    // },
    plugins: [
        new FriendlyErrorsPlugin(),
        // new CleanWebpackPlugin('dist'),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            filename: "./index.html"
        }),
        /*提取css到页面引入*/
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:5].css',
            // chunkFilename: '[id].css'
        }),
        // 告诉 Webpack 使用了哪些动态链接库
        new Webpack.DllReferencePlugin({
            // 描述 lodash 动态链接库的文件内容
            manifest: require('../src/assets/vendor/vendors.manifest.json')
        })
    ]
};
