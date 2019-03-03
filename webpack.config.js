const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:'production',
    entry: __dirname + '/src/index.js',
    module:{
        rules: [
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test:/\.html$/,
                use:[{
                    loader:'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            }
        ]
    },
    output: {
        filename: "js/[name].js"
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
};
