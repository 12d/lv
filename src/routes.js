import React from 'react';
import { Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './common/App';
// import OrderList from './order/List';
// import OrderDetail from './order/Detail';
//
// import ProductDetail from './product/Detail';
// import PriceCalendar from './product/PriceCalendar';
// import ProductFeatures from './product/ProductFeatures';
// import LineSchedule from './order/LineSchedule';
//
// import Booking from './product/Booking';



function loadLogin(nextState, callback){
        require.ensure(['./account/Login'], function(require){
                callback(null, require('./account/Login').default);
        },'login')
}
function loadOrderList(nextState, callback){
        require.ensure(['./order/List'], function(require){
                callback(null, require('./order/List').default);
        },'orderlist')
}
function loadOrderDetail(nextState, callback){
        require.ensure(['./order/Detail'], function(require){
                callback(null, require('./order/Detail').default);
        },'orderdetail')
}
function loadProductList(nextState, callback){
        require.ensure(['./product/List'], function(require){
                callback(null, require('./product/List').default);
        },'productlist')
}
function loadProductDetail(nextState, callback){
        require.ensure(['./product/Detail'], function(require){
                callback(null, require('./product/Detail').default);
        },'productdetail')
}
function loadPriceCalendar(nextState, callback){
        require.ensure(['./product/PriceCalendar'], function(require){
                callback(null, require('./product/PriceCalendar').default);
        },'pricecalendar')
}
function loadProductFeatures(nextState, callback){
        require.ensure(['./product/ProductFeatures'], function(require){
                callback(null, require('./product/ProductFeatures').default);
        }, 'productfeatures')
}
function loadLineSchedule(nextState, callback){
        require.ensure(['./order/LineSchedule'], function(require){
                callback(null, require('./order/LineSchedule').default);
        }, 'lineschedule')
}
function loadBooking(nextState, callback){
        require.ensure(['./product/Booking'], function(require){
                callback(null, require('./product/Booking').default);
        },'booking')
}
function loadShop(nextState, callback){
    require.ensure(['./shop/Detail'], function(require){
        callback(null, require('./shop/Detail').default);
    },'shopdetail')
}
function loadMarketing(nextState, callback){
    require.ensure(['./shop/Marketing'], function(require){
        callback(null, require('./shop/Marketing').default);
    },'marketing')
}
function loadMarketingList(nextState, callback){
    require.ensure(['./shop/MarketingList'], function(require){
        callback(null, require('./shop/MarketingList').default);
    },'mktlist')
}
export default (
    <App appIcons={{
        '57x57': 'http://s1.lvlv.io/files/greenlogo57@2x.png',
        '72x72': 'http://s1.lvlv.io/files/greenlogo57@2x.png',
        '114x114': 'http://s1.lvlv.io/files/greenlogo57@2x.png',
        '144x144': 'http://s1.lvlv.io/files/greenlogo57@2x.png'
    }}>
            <Router history={browserHistory}>
                <Route path='/login' getComponent={loadLogin}/>
                <Route path='/order' getComponent={loadOrderList}/>
                <Route path='/order/list' getComponent={loadOrderList}/>
                <Route path='/order/:id' getComponent={loadOrderDetail}/>
                <Route path='/order/:id/schedule' getComponent={loadLineSchedule}/>
                <Route path='/product/' getComponent={loadProductList}/>
                <Route path='/product/list' getComponent={loadProductList}/>
                <Route path='/product/:id' getComponent={loadProductDetail}/>
                <Route path='/product/:id/features' getComponent={loadProductFeatures}/>
                <Route path='/product/:id/pricecalendar' getComponent={loadPriceCalendar}/>
                <Route path='/product/booking/:id' getComponent={loadBooking}/>
                <Route path='/shop/:id' getComponent={loadShop}/>
                <Route path='/mkt/:id' getComponent={loadMarketing}/>
                <Route path='/mkt/list/:id' getComponent={loadMarketingList}/>
            </Router>
    </App>
)



