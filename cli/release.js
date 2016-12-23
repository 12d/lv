/**
 * @author xuweichen@meitu.io
 * @date 10/29/16
 */
var webpack = require("webpack");
var config = require('../webpack.release.config');
// returns a Compiler instance
var compiler = webpack(config);

compiler.run(function(err, stats) {
    err && console.log(err);
    console.log('release successful');
});
// or
// compiler.watch({ // watch options:
//     aggregateTimeout: 300, // wait so long for more changes
//     poll: true // use polling instead of native watchers
//     // pass a number to set the polling interval
// }, function(err, stats) {
//     // ...
// });