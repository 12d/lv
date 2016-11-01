import React from 'react';
import { Router, IndexRoute, Route, browserHistory} from 'react-router';
import Index from './home/Index';

export default (
    <Router history={browserHistory}>
        <Route path='/' component={Index}>
            <IndexRoute component={Index}/>
            <Route path='home' component={Index}/>
        </Route>
    </Router>
)



