const Webpack = require('webpack');
const WebpackBaseConfig = require('./webpack.base.config');
const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = WebpackMerge(WebpackBaseConfig, {
        mode: 'production',
        output: {
            filename: "js/[name].[chunkhash:8].js"
        },

        plugins: [
            new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
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
        ]
    }
);