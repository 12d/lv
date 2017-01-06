var path = require('path');
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //将css生成单独文件
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // click on the name of the option to get to the detailed documentation
    // click on the items with arrows to show more examples / advanced options

    entry: {
        // client: './src/bootstrap',
        client: './src/bootstrap',
        libs: './src/libs/mui/mui'
    }, // string | object | array
    // Here the application starts executing
    // and webpack starts bundling

    output: {
        // options related how webpack emits results

        path: path.resolve(__dirname, "dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: "[name].[hash:8].entry.js", // string
        chunkFilename: "[name].[hash:8].js", // string
        // the filename template for entry chunks

        publicPath: "/", // string
        // the url to the output directory resolved relative to the HTML page

        library: "libs", // string,
        // the name of the exported library

        libraryTarget: "amd", // enum
        // the type of the exported library

        /* Advanced output configuration (click to show) */
    },

    module: {
        // configuration regarding modules

        rules: [
            // rules for modules (configure loaders, parser options, etc.)

            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    'node_modules'
                ],
                // matching conditions, each accepting regular expression or string
                // test and include behave equal, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude
                // - Try to avoid exclude and prefer include

                //issuer: { test, include, exclude },
                // conditions for the issuer (the origin of the import)

                // enforce: "pre",
                // enforce: "post",
                // apply these rule even if rules are overridden (advanced option)

                loader: "babel-loader",
                // the loader which should be applied, it'll be resolve relative to the context
                // -loader suffix is no longer optional in Webpack 2 for clarity reasons
                // see webpack 1 upgrade guide

                options: {
                    "presets": ["react",'es2015','stage-0']
                },
                // options for the loader
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                })
            },

            {
                test: "\.html$",

                use: [
                    // apply multiple loaders and options
                    "htmllint-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },
            // {test: /\.woff((\?|\#)[\?\#\w\d_-]+)?$/, loader: "url", query: {limit: 100, minetype: 'application/font-woff', name: fontName}},
            // {test: /\.woff2((\?|\#)[\?\#\w\d_-]+)?$/, loader: "url", query: {limit: 100, minetype: 'application/font-woff2', name: fontName}},
            // {test: /\.ttf((\?|\#)[\?\#\w\d_-]+)?$/, loader: "url", query: {limit: 100, minetype: "application/octet-stream", name: fontName}},
            // {test: /\.eot((\?|\#)[\?\#\w\d_-]+)?$/, loader: "url", query: {limit: 100, name: fontName}},
            // {test: /\.svg((\?|\#)[\?\#\w\d_-]+)?$/, loader: "url", query: {limit: 10000, minetype: "image/svg+xml", name: fontName}},

            {
                test: /.*\.(png|jpe?g|svg)$/i,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ],

        /* Advanced module configuration (click to show) */
    },

    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)

        // modules: [
        //     "node_modules",
        //     path.resolve(__dirname, "app")
        // ],
        // directories where to look for modules

        extensions: [".js", ".json", ".jsx", ".css"],
        // extensions that are used

        alias: {
            // a list of module name aliases

            "react": "preact-compat",
            // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"

            "react-dom": "preact-compat",
            // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"
        },
        /* alternative alias syntax (click to show) */

        /* Advanced resolve configuration (click to show) */
    },

    // performance: {
    //     hints: "warning", // enum
    //     maxAssetSize: 200000, // int (in bytes),
    //     maxEntrypointSize: 400000, // int (in bytes)
    //     assetFilter: function(assetFilename) {
    //         // Function predicate that provides asset filenames
    //         return assetName.endsWith('.css') || assetName.endsWith('.js');
    //     }
    // },

    //devtool: "eval", // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.

    context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory

    //target: "web", // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules

    // externals: ["react", /^@angular\//],
    // Don't follow/bundle these modules, but request them at runtime from the environment

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
        //允许错误不打断程序
        // new webpack.NoErrorsPlugin(),
        //把指定文件夹下的文件复制到指定的目录
        // new TransferWebpackPlugin([
        //     {from: 'css'}
        // ], path.resolve(__dirname,"dist"))
        new ExtractTextPlugin({filename:'[name].[contenthash:4].css',allChunks: true, disable: false}),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({name: "libs", filename: "[name].[hash:8].js", chunks: ['libs']})
    ],
    // list of additional plugins


    /* Advanced configuration (click to show) */

    // resolveLoader: { /* same as resolve */ }
    // separate resolve options for loaders

    profile: true, // boolean
    // capture timing information

    bail: true, //boolean
    // fail out on the first error instead of tolerating it.

    cache: false, // boolean
    // disable/enable caching

    watch: true, // boolean
    // enables watching

    watchOptions: {
        aggregateTimeout: 1000, // in ms
        // aggregates multiple changes to a single rebuild

        poll: true,
        poll: 500, // intervall in ms
        // enables polling mode for watching
        // must be used on filesystems that doesn't notify on change
        // i. e. nfs shares
    },

    node: {
        /* TODO */
    },

    recordsPath: path.resolve(__dirname, "build/records.json"),
    recordsInputPath: path.resolve(__dirname, "build/records.json"),
    recordsOutputPath: path.resolve(__dirname, "build/records.json"),
    // TODO

}
