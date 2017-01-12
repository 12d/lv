var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    devServer: {
        host: '192.168.0.11'
    },
    historyApiFallback: true
}).listen(8080, '192.168.0.11', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://192.168.0.11:8080/');
});
