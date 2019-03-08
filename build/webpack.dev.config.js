const Webpack = require('webpack');
const WebpackBaseConfig = require('./webpack.base.config');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
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
        ]
    }
);