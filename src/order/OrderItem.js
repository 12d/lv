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
        return (
            <li className="mui-table-view-cell mui-media mui-card order-list ">
                <ul className="normal-order-list">
                    <li className="gray-font">订单编号<span className="theme-font margin-left-10">201021020120</span></li>
                    <li className="gray-font">出行时间<span className="margin-left-10">2016-11-11 至 2016-12-12</span></li>
                    <li className="order-status">
                        <img src={require('../assets/clock.png')} className="app-icon"/>
                        <p className="order-status-text theme-font">进行中</p>
                    </li>
                </ul>

                <Link to="/order/detail/12" className="order-content">
                    <img className="mui-media-object mui-pull-left list-img" src="http://img1.imgtn.bdimg.com/it/u=1295282351,3518762526&fm=21&gp=0.jpg"/>
                    <div className="mui-media-body order-name">
                        摄影之旅 呼和浩特+希拉穆仁草原+库不齐沙漠4日3晚跟团游(2钻) 草原篝火晚会 聆听神奇啥想玩 涮羊肉
                    </div>
                </Link>
                <div className="order-agent gray-font">
                    <span >春秋万国旅行</span>
                    <span className="order-price-wrap">订单金额 <span className="order-price">￥400</span></span>
                </div>
            </li>
        )
    }
}