/**
 * @author xuweichen@meitu.io
 * @date 2017/7/13
 */
const cluster = require('cluster');
// const http = require('http');
const express = require('express');
const numCPUs = require('os').cpus().length;
var fs = require('fs');
var url = require('url');
var path = require('path');
var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom/server');
var seo = require('../dist/seo.entry.js');
var jsdom = require('jsdom');
var htmlTemplate = fs.readFileSync(path.resolve(__dirname,'../dist','index.html'),'utf8');
var DefaultRoute = ReactRouter.ReactRouter;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var RouterContext = ReactRouter.RouterContext;
var match = ReactRouter.match;
var document = jsdom.jsdom(htmlTemplate);
var app = express();
var compress = require('compression');

var head = document.querySelector('head');
var initalHeadHTML = head.innerHTML;
var container  = document.querySelector("#app-container");
function renderFullPage(html, initialState) {
    container.innerHTML=html;
    head.innerHTML=initalHeadHTML+'<script>window.__INITIAL_STATE__ = '+JSON.stringify(initialState)+';window.__RENDER_AT="server"</script>';
    return document.documentElement.outerHTML;
}
//添加MIME类型
var MIME_TYPE = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    // http.createServer((req, res) => {
    //     res.writeHead(200);
    //     res.end('hello world\n');
    // }).listen(1338);
    var app = express();
    //gzip开启压缩
    app.use(compress());
    app.use(function(req, res){
        match({ routes:global.getSEORoutes(),  location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                console.log('renderProps.params',JSON.stringify(renderProps.params));
                // debugger
                // console.log(renderProps.components[1].prefetch())
                var coms = renderProps.components.filter(com=>(com && com.prefetch));
                console.log(coms[0].prefetch)
                var promises = coms.map(com=>com.prefetch(renderProps.params,renderProps));
                Promise.all(promises).then(values=>{
                    // var attrs = Object.assign({data: values}, renderProps);
                    renderProps.location.state = values[0];
                    console.log(ReactDOM.renderToString(React.createElement(RouterContext,renderProps)))
                    res.status(200).send(renderFullPage(ReactDOM.renderToString(React.createElement(RouterContext,renderProps)), values[0]||{}));
                }).catch(error=>res.status(500).send(error.message));
                console.log('waiting for response')

            } else {
                var request = req;
                var response = res;
                var pathname = url.parse(request.url).pathname;
                var realPath = path.join(process.cwd(),'dist',pathname);
                console.log('request: '+ realPath);
                var ext = path.extname(realPath);
                ext = ext?ext.slice(1) : 'unknown';
                var contentType = MIME_TYPE[ext] || "text/plain";

                fs.exists(realPath, function (exists) {

                    if (!exists) {
                        console.log("This request URL " + pathname + " was not found on this server.")
                        response.writeHead(404, {'Content-Type': 'text/plain'});

                        response.write("This request URL " + pathname + " was not found on this server.");

                        response.end();

                    } else {

                        fs.readFile(realPath, "binary", function(err, file) {

                            if (err) {

                                response.writeHead(500, {'Content-Type': 'text/plain'});

                                response.end(err);

                            } else {

                                response.writeHead(200, {'Content-Type': contentType});

                                response.write(file, "binary");

                                response.end();

                            }

                        });

                    }

                });
            }
        })
    })
    app.listen(5678);
    console.log(`Worker ${process.pid} started`);
}