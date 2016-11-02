import React from 'react';
import { Router, IndexRoute, Route, browserHistory} from 'react-router';
import List from './order/List';
import Detail from './order/Detail';

export default (
    <Router history={browserHistory}>
        <Route path='/order' component={List}/>
        <Route path='/order/list' component={List}/>
        <Route path='/order/detail/:id' component={Detail}/>
    </Router>
)



