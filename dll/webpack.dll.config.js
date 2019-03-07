const path = require('path');
const webpack = require('webpack');
const rootPath = path.resolve(__dirname, '../');

const isPro = process.env.NODE_ENV === 'production';

module.exports = {
    mode:'production',
    entry:  {
        vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(rootPath, 'dist/site'),
        filename: 'dll_[name].js',
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(rootPath, "dist/site", "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ]
}
