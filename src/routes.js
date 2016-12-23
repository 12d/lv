import React from 'react';
import { Router, IndexRoute, Route, browserHistory} from 'react-router';
import OrderList from './order/List';
import OrderDetail from './order/Detail';

import ProductList from './product/List';
import ProductDetail from './product/Detail';
import PriceCalendar from './product/PriceCalendar';
import ProductFeatures from './product/ProductFeatures';
import LineSchedule from './order/LineSchedule';

import Booking from './product/Booking';

import Login from './account/Login';
export default (
    <Router history={browserHistory}>
        <Route path='/login' component={Login}/>
        <Route path='/order' component={OrderList}/>
        <Route path='/order/list' component={OrderList}/>
        <Route path='/order/:id' component={OrderDetail}/>
        <Route path='/order/:id/schedule' component={LineSchedule}/>
        <Route path='/product/' component={ProductList}/>
        <Route path='/product/list' component={ProductList}/>
        <Route path='/product/:id' component={ProductDetail}/>
        <Route path='/product/:id/features' component={ProductFeatures}/>
        <Route path='/product/:id/pricecalendar' component={PriceCalendar}/>

        <Route path='/product/booking/:id' component={Booking}/>

    </Router>
)



