/**
 * @author xuweichen@meitu.io
 * @date 10/31/16
 */
var fs = require('fs');
var url = require('url');
var path = require('path');
var express = require('express');
var React = require('react');
var ReactRouter = require('react-router');
var ReactDOM = require('react-dom/server');
var seo = require('../dist/seo.entry');
var jsdom = require('jsdom');
var htmlTemplate = fs.readFileSync('../dist/index.html','utf8');
var DefaultRoute = ReactRouter.ReactRouter;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var RouterContext = ReactRouter.RouterContext;
var match = ReactRouter.match;
var document = jsdom.jsdom(htmlTemplate);
var app = express();
var head = document.querySelector('head');
var initalHeadHTML = head.innerHTML;
var container  = document.querySelector("#app-container");
function renderFullPage(html, initialState) {
    container.innerHTML=html;
    head.innerHTML=initalHeadHTML+'<script>window.__INITIAL_STATE__ = '+JSON.stringify(initialState)+';</script>';
    return document.documentElement.outerHTML;
}

app.use(function(req, res){
    match({ routes:global.getSEORoutes(),  location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            /**
             * [ 'routes',
             'params',
             'location',
             'components',
             'router',
             'matchContext' ]

             */
            // You can also check renderProps.components or renderProps.routes for
            // your "not found" component or route respectively, and send a 404 as
            // below, if you're using a catch-all route.
            // console.log(renderProps.matchContext);
            // console.log(React.cloneElement(RoutingContext,renderProps))
            res.status(200).send(renderFullPage(ReactDOM.renderToString(React.createElement(RouterContext,renderProps)), renderProps.params));
        } else {
            var request = req;
            var response = res;
            var pathname = url.parse(request.url).pathname;

            var realPath = path.join(__dirname,'../dist',pathname);

            // console.log(path,'=============');
        // console.log(path.exists,'=============');
            console.log('------read file------',realPath);
            console.log(__dirname,'__dirname')
            fs.exists(realPath, function (exists) {

                if (!exists) {

                    response.writeHead(404, {'Content-Type': 'text/plain'});

                    response.write("This request URL " + pathname + " was not found on this server.");

                    response.end();

                } else {

                    fs.readFile(realPath, "binary", function(err, file) {

                        if (err) {

                            response.writeHead(500, {'Content-Type': 'text/plain'});

                            response.end(err);

                        } else {

                            response.writeHead(200, {'Content-Type': 'text/html'});

                            response.write(file, "binary");

                            response.end();

                        }

                    });

                }

            });
        }
    })
})
app.listen(8888);
console.log('server starting at 8888')

