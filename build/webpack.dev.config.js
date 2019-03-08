const Webpack = require('webpack');
const WebpackBaseConfig = require('./webpack.base.config');
const WebpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = WebpackMerge(WebpackBaseConfig, {
        mode:'development',
        output: {
            filename: "js/[name].js"
        },

        // optimization: {
        //     runtimeChunk: {
        //         name: 'manifest'
        //     },
        //     splitChunks: {
        //         chunks: "initial",
        //         name: 'vendors',
        //         cacheGroups: {
        //             math: {
        //                 name: 'math',
        //                 test: /math/,
        //                 minChunks: 1,
        //                 minSize: 0,
        //                 priority: 10,
        //                 reuseExistingChunk: true
        //             }
        //         }
        //     },
        // },
        devtool: 'inline-source-map',
        devServer: {
            // port: '3000',
            contentBase: path.join(__dirname, '../dist'),
            compress: true,
            historyApiFallback: true,
            hot: true,
            https: false,
            noInfo: true,
            clientLogLevel:'none',
            open: true,
            proxy: {}
        },
        plugins: [
            new Webpack.HotModuleReplacementPlugin(), //添加
            new Webpack.NamedModulesPlugin(), //添加，官方推荐的帮助分析依赖的插件

        ]
    }
);