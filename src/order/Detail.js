/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
import React,{
    Component
} from 'react';

import Page from '../common/Page';
// import '../css/order.css';
export default class Detail extends Page {
    static headerview = {
        title: '订单详情'
    }
    constructor(){
        super();
    }
    componentWillMount(){
        console.log(this.props)

    }
    render(){
        return this.create(

                <div className="mui-scroll">
                    <ul className="mui-table-view ">
                        <li className="mui-table-view-cell">
                            <span className="mui-pull-left normal-font">订单编号 201210120120120</span>
                            <span className="mui-pull-right normal-font">2016-12-09 预定</span>
                        </li>
                        <li className="mui-table-view-cell">
                            <a href="#account" className="mui-navigate-right mui-pull-left">订单总额</a>
                            <div className="mui-pull-right">
                                <span style={{color:"red",fontSize: 16, marginRight: 10}}>￥4999</span><span className="mui-ellipsis tiny-font gray-font">明细</span>
                            </div>
                        </li>
                        <li className="mui-table-view-cell mui-media">
                            <a className="mui-navigate-right" href="#account">

                                <div className="mui-media-body">
                                    您的订单录入成功, 正在安排酒店资源
                                    <p className='mui-ellipsis'>2016-12-12 12:12</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="mui-card">
                        <div className="mui-card-header tiny-font gray-font">
                            摄影之旅 呼和浩特+希拉穆仁草原+库不齐沙漠4日3晚跟团游(2钻) 草原篝火晚会 聆听神奇啥想玩 涮羊肉
                        </div>
                        <div className="mui-card-content">
                            <div className="mui-card-content-inner schedule-container">
                                <div className="shedule-time">
                                    <span className="large-font theme-font">12月12日</span>
                                    <span className="tiny-font">周二出发</span>
                                </div>
                                <div className="person-text">
                                    2人
                                </div>
                                <div className="shedule-time" style={{right:15,textAlign:'right'}}>
                                    <span className="large-font theme-font">12月25日</span>
                                    <span className="tiny-font">周五返回</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="mui-table-view ">
                        <li className="mui-table-view-cell">
                            <a>
                                导游/领队
                                <span className="mui-pull-right field-value">刘导游<span className="mui-icon mui-icon-phone guider-phone"></span></span>
                            </a>
                        </li>
                        <li className="mui-table-view-cell">
                            <a href="#account" className="mui-navigate-right">出行人
                                <span className="mui-pull-right field-value">陈建国,陈鑫,李曼等12人</span>
                            </a>

                        </li>
                        <li className="mui-table-view-cell">
                            <a href="#account" className="mui-navigate-right">行程安排</a>
                        </li>
                        <li className="mui-table-view-cell">
                            <a href="#account" className="mui-navigate-right">交通/住宿</a>
                        </li>
                    </ul>
                    <div style={{margin: '10px 20px'}}>
                        <button className="mui-btn mui-btn-block theme-font"><span style={{fontSize:24}} className="mui-icon mui-icon-phone"></span>联系旅行社</button>
                    </div>
                </div>

        )
    }
}