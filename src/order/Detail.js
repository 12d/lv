/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
import React,{
    Component
} from 'react';
import {Link} from 'react-router';
import {Page, Model,Bridge} from '../common/lv';
import '../css/order.css';
var weeksStr = ['日','一','二','三','四','五','六'];
function paddingStr(str){
    str += '';
    return str.length<2 ? '0'+str : str
}
function getDateStr(datestring){
    var date = new Date(datestring);
    return {
        month: paddingStr(date.getMonth()+1),
        date: paddingStr(date.getDate()),
        day: weeksStr[date.getDay()]
    }
}
export default class Detail extends Page {
    headerview = {
        title: '订单详情',
        right: [
            {
                text: '订单列表',
                onClick: function(){
                    Page.forward('/order/list')
                }
            }
        ]
    }
    constructor(){
        super();
    }
    componentWillMount(){
        this.state = {
            data: null
        }
    }
    componentDidMount(){
        this.showLoading();

        var refer = this.props.location.state && this.props.location.state.refer;

        Model.post('/sharedline/getorderdetail',{
            orderID: this.props.params.id
        }).then(rs=>{
            this.hideLoading();
            console.log('refer',refer)
            this.setState({
                data: rs.Data.Infos||{},
                refer
            })
        }).catch(e=>{

        })
    }
    render(){
        var data = this.state.data,
            startDateInfo,
            endDateInfo;

        if(data){
            startDateInfo = getDateStr(data.TravelStartDateString);
            endDateInfo = getDateStr(data.TravelEndDateString)
        }

        return this.create(
                data ?
                <div className="mui-scroll">
                    {
                        this.state.refer
                            ?
                    <div className="mui-card booking-result booking-succss">
                        <div className="mui-card-content">
                            <div className="mui-card-content-inner">
                                <span className="mui-icon mui-icon-checkmarkempty mui-pull-left"></span>
                                <span><span style={{fontSize:16,fontWeight:"bold"}} >预约成功</span><br/>稍后将有客服与您联系, 请保持电话畅通</span>
                            </div>
                        </div>
                    </div>
                            :
                            null
                    }
                    <ul className="mui-table-view ">
                        <li className="mui-table-view-cell">
                            <span className="mui-pull-left normal-font">订单编号&nbsp;{data.OrderNo}</span>
                            <span className="mui-pull-right normal-font">{data.DataChangeCreateTimeString.substr(5)} <span className="tiny-font gray-font">预定</span></span>
                        </li>
                        <li className="mui-table-view-cell">
                            <a href="#account" className="mui-navigate-right mui-pull-left">订单总额</a>
                            <div className="mui-pull-right">
                                <span style={{fontSize: 16, marginRight: 10,color: 'orange'}}>¥&nbsp;{data.Amount}</span>
                            </div>
                        </li>
                        <li className="mui-table-view-cell mui-media">
                            <a  href="#account">

                                <div className="mui-media-body" style={{whiteSpace:'normal'}}>
                                    <span className="mui-icon mui-icon mui-icon-checkmarkempty" style={{color:'green',fontSize:24}}></span>您的订单状态正常({data.OrderStatusShow}), 如有疑问, 请点击屏幕底部按钮联系客服
                                    <p className='mui-ellipsis' style={{textAlign:'right'}}>{data.DataChangeCreateTimeString}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="mui-card">
                        <div className="mui-card-header tiny-font gray-font">
                            {data.LineName}
                        </div>
                        <div className="mui-card-content">
                            <div className="mui-card-content-inner schedule-container">
                                <div className="shedule-time">
                                    <span className="extra-large-font theme-font">{startDateInfo.month}月{startDateInfo.date}日</span>
                                    <span className="tiny-font">周{startDateInfo.day}出发</span>
                                </div>
                                <div className="person-text">
                                    {data.FromCityName}&nbsp;至&nbsp;{data.ToCityName}
                                </div>
                                <div className="shedule-time" style={{right:15,textAlign:'right'}}>
                                    <span className="extra-large-font theme-font">{endDateInfo.month}月{endDateInfo.date}日</span>
                                    <span className="tiny-font">周{endDateInfo.day}返回</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="mui-table-view ">
                        <li className="mui-table-view-cell">
                            <a>
                                导游/领队
                                <span className="mui-pull-right field-value">正在安排中</span>
                            </a>
                        </li>
                        <li className="mui-table-view-cell">
                            <a href="#account">出行人
                                <span className="mui-pull-right field-value">{data.ContactName}等{data.AdultCount+data.ChildCount}人</span>
                            </a>

                        </li>
                        <li className="mui-table-view-cell">
                            <Link to={"/order/"+this.props.params.id+"/schedule"} className="mui-navigate-right">行程安排</Link>
                        </li>
                        <li className="mui-table-view-cell" style="display:none">
                            <a href="#account" className="mui-navigate-right">交通/住宿</a>
                        </li>
                    </ul>
                    <div style={{margin: '10px'}}>
                        <button onClick={()=>Bridge.callPhone(15618870543)} className="mui-btn mui-btn-block theme-font" style={{padding: '10px 0',borderRadius:0}}><span style={{fontSize:24}} className="mui-icon mui-icon-phone"></span>联系客服</button>
                    </div>
                </div>
                :
                null
        )
    }
}
