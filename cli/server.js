var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    devServer: {
        host: '192.168.0.43'
    },
    historyApiFallback: true
}).listen(3000, '192.168.0.43', function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log('Listening at http://localhost:3000/');
});
