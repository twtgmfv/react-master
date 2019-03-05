const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.j(s|sx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname,'../src'),
                use: [
                    'cache-loader',
                    {
                        loader: 'babel-loader',
                        // 开启缓存功能
                        options: {
                            cacheDirectory: true
                        }
                    }

                ]
            },
            {
                test: /\.s?[ac]ss$/,
                include: path.resolve(__dirname,'../src'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules:true,
                            sourceMap:true,
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
                math: {
                    name: 'tools',
                    test: /jianlc/,
                    minChunks: 1,
                    minSize: 0,
                    priority: 10,
                    reuseExistingChunk: true
                }
            }
        },
    },

    plugins: [
        // new CleanWebpackPlugin('dist'),
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, "../src/index.html"),
            filename: "./index.html"
        })
    ]
};
