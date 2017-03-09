// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import { Router, IndexRoute, Route, browserHistory,match} from 'react-router';
import Mkt from './common/Mkt';

match({ routes:routes,  location: location.href }, (error, redirectLocation, renderProps) => {
    Mkt.init(renderProps.location);
    ReactDOM.render(
        routes,
        document.getElementById('app-container')
    )
})

