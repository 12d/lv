import React,{
    Component
} from 'react';
import {Link } from 'react-router'
import Page from '../common/Page';

export default class OrderItem extends Component {
    constructor(){
        super();
    }
    render(){
        var data = this.props.data;
        return (
            <li className="mui-table-view-cell mui-media mui-card custom-list ">
                <ul className="normal-order-list">
                    <li className="gray-font">订单编号<span className="theme-font m-left-10">{data.OrderNo}</span></li>
                    <li className="gray-font">出行时间<span className="m-left-10">{data.TravelStartDateString} 至 {data.TravelEndDateString}</span></li>
                    <li className="order-status">
                        <img src={require('../assets/clock.png')} className="app-icon"/>
                        <p className="order-status-text theme-font">{data.OrderStatusShow}</p>
                    </li>
                </ul>

                <Link to={"/order/"+data.OrderId} className="order-content custom-list-content">
                    <div className="mui-media-body order-name">
                        {data.LineName}
                    </div>
                </Link>
                <div className="order-agent gray-font">
                    <span>下单&nbsp;{data.DataChangeCreateTimeString}</span>
                    <span className="order-price-wrap">订单金额 <span className="order-price">{data.AmountShow}</span></span>
                </div>
            </li>
        )
    }
}