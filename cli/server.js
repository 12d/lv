var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
function getIPAdress(){
    var interfaces = require('os').networkInterfaces();
    for(var devName in interfaces){
        var iface = interfaces[devName];
        for(var i=0;i<iface.length;i++){
            var alias = iface[i];
            if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
}
var ip = getIPAdress();

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    devServer: {
        host: ip
    },
    historyApiFallback: true
}).listen(8080, ip, function (err, result) {
    if (err) {
        return console.log(err);
    }

    console.log(`Listening at http://${ip}:8080/`);
});
