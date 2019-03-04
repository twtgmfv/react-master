const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'production',
    entry: __dirname + '/src/index.js',
    output: {
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.j(s|sx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name:'manifest'
        },
        splitChunks: {
            chunks: "all",
            minSize:30,
            cacheGroups: {
                vendors:{
                    name:'vendors',
                    test:/react/,
                    minChunks:1,
                    reuseExistingChunk: true
                }
            }
        },
    },
    // devtool: 'eval',
    devServer: {
        // port: '3000',
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true,
        open: true,
        proxy: {}
    },
    plugins: [
        // new CleanWebpackPlugin('dist'),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),


        new webpack.HotModuleReplacementPlugin(), //添加
        new webpack.NamedModulesPlugin(), //添加，官方推荐的帮助分析依赖的插件
    ]
};
