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
            }
        ]
    },
    output: {
        filename: "js/[name].js"
    }
};
