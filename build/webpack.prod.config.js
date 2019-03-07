const Webpack = require('webpack');
const WebpackBaseConfig = require('./webpack.base.config');
const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') //css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //js压缩

const isDev = false;


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
            })
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: isDev ? true : false, // set to true if you want JS source maps,
                    uglifyOptions: {
                        warnings: false
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