const Webpack = require('webpack');
const WebpackBaseConfig = require('./webpack.base.config');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') //css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //js压缩

// const isDev = process.env.NODE_ENV === 'development';
// console.log('prod-isDev:::',isDev);

// process.env.NODE_ENV = 'production';
// let isDev = process.env.NODE_ENV === 'development';
// // console.log('prod-isDev:::',isDev);
let isDev = false

module.exports = WebpackMerge(WebpackBaseConfig, {
        mode: 'production',
        output: {
            filename: "js/[name].[chunkhash:8].js"
        },
        devtool: false,// 生产环境不开启sourceMap
        plugins: [
            new CleanWebpackPlugin(['../dist'], {allowExternal: true}),
            // 缓存模块
            new Webpack.HashedModuleIdsPlugin(),
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname, "../src/index.html"),
                filename: "./index.html",
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                }
            }),

            // 该插件将把给定的 JS 或 CSS 文件添加到 webpack 配置的文件中，并将其放入资源列表 html webpack插件注入到生成的 html 中。
            new AddAssetHtmlPlugin([
                {
                    // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
                    filepath: require.resolve(path.resolve(__dirname, '../src/assets/vendor/vendors.dll.js')),
                    // 文件输出目录
                    outputPath: 'js/vendor',
                    // 脚本或链接标记的公共路径
                    publicPath: 'js/vendor',
                    hash:true
                }
            ])

        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: isDev ? true : false, // set to true if you want JS source maps,
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            // 在UglifyJs删除没有用到的代码时不输出警告
                            warnings: false,
                            // 删除所有的 `console` 语句，可以兼容ie浏览器
                            drop_console: true,
                            // 内嵌定义了但是只用到一次的变量
                            collapse_vars: true,
                            // 提取出出现多次但是没有定义成变量去引用的静态值
                            reduce_vars: true,
                        },
                        output: {
                            // 最紧凑的输出
                            beautify: false,
                            // 删除所有的注释
                            comments: false,
                        }

                    }
                }),
                new OptimizeCSSPlugin({
                    cssProcessorOptions: isDev ? true : false ? {
                        safe: true,
                        map: {
                            inline: false
                        }
                    } : {
                        safe: true
                    }
                })
            ]
        }
    }
);
