// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Router, IndexRoute, Route, browserHistory,match} from 'react-router';
// match({ history, routes }, (error, redirectLocation, renderProps) => {
//     const { location } = renderProps;
match({ routes:routes,  location: location.href }, (error, redirectLocation, renderProps) => {
    ReactDOM.render(
        routes,
        document.getElementById('app-container')
    )
})

