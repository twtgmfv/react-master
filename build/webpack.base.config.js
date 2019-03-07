const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")//webpack4提取样式到单独文件,并且进行压缩，配合下面两个插件使用
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
console.log("ENV:::::", isDev);
module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.j(s|sx)$/,
                // exclude: /node_modules/,
                // include: [path.resolve(__dirname,'../src'),/@jianlc/],
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
                    isDev && 'style-loader' || MiniCssExtractPlugin.loader,
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
            }
        },

    },

    plugins: [
        // new CleanWebpackPlugin('dist'),
        new Webpack.DllReferencePlugin({
            // 描述 react 动态链接库的文件内容
            manifest: require('../dist/site/vendor-manifest.json'),
        }),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            filename: "./index.html"
        }),
        /*提取css到页面引入*/
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:5].css',
            // chunkFilename: '[id].css'
        }),

        new AddAssetHtmlPlugin({
            filepath: require.resolve(path.resolve(__dirname,`../dist/site/dll_vendor.js`)),
            includeSourcemap: false
        }),
    ]
};
