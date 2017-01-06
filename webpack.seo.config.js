var path = require('path');
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
module.exports = {
    //devtool: 'source-map',
    // entry: [
    //     './src/js/bootstrap.js',
    //     './src/js/bootstrap-seo.js'
    // ],
    entry: {
        // client: './src/bootstrap',
       seo: './src/bootstrap-seo'
    },
    target: "node",
    output: {
        path: path.join(__dirname, 'dist'),
        filename:  "[name].entry.js",
        chunkFilename: "[name].[hash:8].js",
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // 压缩打包的文件
      
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
       
        //允许错误不打断程序
        // new webpack.NoErrorsPlugin(),
        //把指定文件夹xia的文件复制到指定的目录
        new TransferWebpackPlugin([
            {from: 'fonts'}
        ], path.resolve(__dirname,"dist"))
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        },{
            test: /\.css$/,
            exclude: 'node_modules',
            loader: 'style-loader!css-loader'
        },{
            test: /\.png$/,
            loader: 'url?limit=10000000&mimetype=image/png',
            include: [process.cwd()],
        }, {
            test: /\.jpg$/,
            loader: 'url?limit=10000000&mimetype=image/jpg',
            include: [process.cwd()]
        }]
    }
};
