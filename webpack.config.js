const path = require('path')
module.exports = {
    mode: 'production',
    entry: {
        // 'index': './src/index.js'
        'p1':'./splitChunk/pages/p1.js',
        'p2':'./splitChunk/pages/p2.js',
        'p3':'./splitChunk/pages/p3.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: "js/[name].js"
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ]
            }
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: "all",//默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为gaichunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
    //         minSize: 30000,  //默认值是30kb
    //         minChunks: 1,  //被多少模块共享
    //         maxAsyncRequests: 5,  //所有异步请求不得超过5个
    //         maxInitialRequests: 3,  //初始话并行请求不得超过3个
    //         name: 'vendors',  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
    //         cacheGroups: { //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
    //             common: {
    //                 name: 'common',  //抽取的chunk的名字
    //                 chunks(chunk) { //同外层的参数配置，覆盖外层的chunks，以chunk为维度进行抽取
    //                     // console.log(':::::::::',chunk);
    //                 },
    //                 //test(module, chunks) {  //可以为字符串，正则表达式，函数，以module为维度进行抽取，只要是满足条件的module都会被抽取到该common的chunk中，为函数时第一个参数是遍历到的每一个模块，第二个参数是每一个引用到该模块的chunks数组。自己尝试过程中发现不能提取出css，待进一步验证。
    //                     // console.log('>>>>>',module);
    //                     // console.log('>>>>>',chunks.name);
    //
    //                 // },
    //                 test: 'hello',
    //                 priority: 10,  //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
    //                 minChunks: 2,  //最少被几个chunk引用
    //                 reuseExistingChunk: true,//	如果该chunk中引用了已经被抽取的chunk，直接引用该chunk，不会重复打包代码
    //                 enforce: true  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
    //             }
    //         }
    //
    //     }
    // },

    // optimization: {
    //
    //     runtimeChunk:{
    //         name: "manifest"
    //     },
    //     splitChunks: {
    //         chunks: "all",
    //         name:true
            // cacheGroups: {
            //     vendor:{
            //         name:'commons',
                    // chunks: "all",
                    // minChunks:2,
                    // maxInitialRequests:5,
                    // minSize:0
                // }
            // }
        // }
    // }

    optimization: {
        runtimeChunk:{
          name:'manifest'
        },
        // occurrenceOrder:true,
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vue:{
                    name:'vue-vendor',
                    test:/vue/,
                    chunks: "all",
                    priority:0,
                    reuseExistingChunk: true,
                    enforce: true
                },
                vendors: {
                    name:'vendors',
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                commons:{
                    chunks: "all",
                    name:'commons',
                    minChunks:2,
                    minSize:0,
                    priority:-15
                }
            }
        }
    }
};
