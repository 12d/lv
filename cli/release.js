/**
 * @author xuweichen@meitu.io
 * @date 10/29/16
 */
var webpack = require("webpack");
var config = require('../webpack.release.config');
// returns a Compiler instance
webpack(config,function(err, stats) {
    if (err || stats.hasErrors()) {
        console.log('asdfa')
    }
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        console.error(info.errors);
    }

    if (stats.hasWarnings()) {
        console.warn(info.warnings)
    }
    console.log('release client version successfully')
});

// or
// compiler.watch({ // watch options:
//     aggregateTimeout: 300, // wait so long for more changes
//     poll: true // use polling instead of native watchers
//     // pass a number to set the polling interval
// }, function(err, stats) {
//     // ...
// });