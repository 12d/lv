var path = require('path');
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //将css生成单独文件
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
       // seo: './src/bootstrap-seo',
        client: './src/bootstrap',
        libs: './src/libs/mui'
    },
    resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },
    //target: 'node',
    output: {
        path: path.join(__dirname, 'dist'),
        filename:  "[name].[hash:8].entry.js",
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
        /*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                //supresses warnings, usually from module minification
                warnings: false
            }
        }),
        */
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({name: "libs", filename: "[name].[hash:8].js", chunks: ['libs']}),
        new ExtractTextPlugin("styles.css"),
        //允许错误不打断程序
        // new webpack.NoErrorsPlugin(),
        //把指定文件夹下的文件复制到指定的目录
        // new TransferWebpackPlugin([
        //     {from: 'css'}
        // ], path.resolve(__dirname,"dist"))
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        },{
            test: /\.css$/,
            exclude: 'node_modules',
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
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
