/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
/*http://www.dcloud.io/hellomui/examples/nav_transparent.html*/

import React,{
    Component
} from 'react';
import {Page, ImageSlider, Model,HTMLText,NormalError,Store,Prompt,Util,Bridge,Spy,Toast} from '../common/lv';
import {Link } from 'react-router';
import DayRouter from './DayRouter';
var priceCalendarData = new Store('KEY_PRICE_CALENDAR');
var secureCodeStore = new Store('SECURE_CODE');
var pageInstance;
var visitedTagStore = new Store('VISITED_TAG',{},{lifetime: '1D'});
import '../css/product.css';

export default class Detail extends Page {
    headerview = {
        title: '产品详情',
        right: [
            {
                text: '优惠码',
                onClick(){
                    pageInstance.showPromotion();
                }
            }
        ]
    }
    static prefetch(params){
        return Model.post('/sharedline/getlinedetail', {
            lineid: params.id,
            owner: params.owner
        },{
            useSecureCode: true
        })
    }
    constructor(){
        super();
        pageInstance = this;
    }
    needShowPromotion(){
        return !visitedTagStore.getItem('visited') && !secureCodeStore.getItem()
    }
    checkPromotionCode(secureCode){
        secureCodeStore.setItem({secureCode});
    }
    showPromotion(){
        var self = this;

        Prompt.show({
            yesLabel:'立即查看',
            noLabel:'没有优惠码',
            onYes(e){
                visitedTagStore.setItem('visited',1);
                self.checkPromotionCode(e.value);
                self.getDetail();
            },
            onNo(){
                visitedTagStore.setItem('visited',1);
                // console.log('no')
            },
            title: '优惠码',
            message: '输入优惠码, 查看更低价格'
        })
    }
    componentWillUnmount(){
        this.slider && this.slider.slider({
            interval: 0
        });
    }
    componentDidMount(){
        this.getDetail();

    }
    componentWillMount(){
        this.state = {
            data: this.getInitialData()
        }

    }
    sharedHandler(){
        Toast.show('分享成功');
        Spy.send({
	    storeid: this.getParams('storeid'),
            token: btoa((+new Date)+this.getParams('owner')),
            owner: parseInt(this.getParams('owner')),
            pids: [this.getParams('id')]
        })
    }
    getDetail(){
        Detail.prefetch(this.props.params).then((rs)=>{
            var detailData = rs.Data.Infos||{};
            this.wechatReady(()=>{
                this.wechat.share({
                    title: this.getParams('sharetitle')||'我在美途旅旅发现了很赞的旅行线路, 快看看~~~', // 分享标题
                    desc: detailData.LineName, // 分享描述
                    link: location.href, // 分享链接
                    imgUrl: rs.Data.Infos.LinePicList[0] && rs.Data.Infos.LinePicList[0].PicturePath, // 分享图标
                });
                this.wechat.on('all', this.sharedHandler.bind(this))
            })
            this.setState({
                data: rs,
                selectedDay: priceCalendarData.getItem('selectedDay')
            },()=>{
                this.slider = mui("#slider");
                this.slider.slider({
                    interval: 5000
                });
            });
            this.needShowPromotion() && this.showPromotion();
        }).catch((e)=>{
            this.setState({
                data: null
            })
        });
    }
    render(){
        var rawData = this.state.data||{},
            data = rawData.Data,
            summary = data && (typeof data.Summary==='string' ? JSON.parse(data.Summary) : data.Summary);

        summary && (data.Summary = summary||{});
        data = data && data.Infos || {};

        return this.create(

            <div>
                <div className="mui-scroll mui-content">
                    <ImageSlider data={data.LinePicList}/>
                    <p className="departure">{data.FromCityName}&nbsp;-&nbsp;{data.ToCityName}&nbsp;</p>
                    <div className="mui-table-view page-section">
                        <h1 className="product-name">{data.LineName}</h1>
                        <p>
                            <span className="prices">
                                <span className="stars">评分&nbsp;{data.StarLevel}&nbsp;星</span>
                                <b className="price">&yen;&nbsp;{data.CostPrice>0?data.CostPrice:data.Price}</b><span>&nbsp;{data.CostPrice>0?'批发价':'起'}</span>
                            </span>
                            <span className="">销量&nbsp;{data.OrderPersonCount}</span>
                        </p>
                    </div>
                    {
                        (data.Summary && data.Summary.ClassicScenicTagList) ?
                            (<div className="scenic-taglist">

                                {data.Summary.ClassicScenicTagList.map((tag,index)=>(
                                    <span className="mui-badge " key={"tag"+index}>
                                                {tag}
                                            </span>
                                ))}

                            </div>)
                            : null
                    }
                    {
                        this.state.data ?

                            <ul className="mui-table-view" style={{marginBottom:60}}>
                                <li className="mui-table-view-cell">
                                    <Link
                                        to={{pathname:"/product/"+data.LineID+"/pricecalendar"}}
                                        className="mui-navigate-right">
                                        <span className="mui-icon-extra mui-icon-extra-calendar"></span>
                                        <span>可订日期与价格</span>
                                        <span className="mui-pull-right field-value">
                                            {this.state.selectedDay && ('已选 '+Object.keys(this.state.selectedDay)[0]) || '请选择出行日期'}
                                        </span>
                                    </Link>

                                </li>
                                <li className="mui-table-view-divider"></li>
                                <li className="mui-table-view-cell ">
                                    <Link
                                        to={{pathname:"/product/"+data.LineID+"/features",state:{features: data.Character}}}
                                        className="mui-navigate-right">产品特色</Link>
                                </li>
                                <li className="mui-table-view-divider">推荐理由</li>
                                <li className="mui-table-view-cell field-value">
                                    <HTMLText html={data.RecommendReason}/>
                                </li>
                                {
                                    (data.TripList && data.TripList.length) ?
                                        <li className="mui-table-view-divider">线路行程</li> : null
                                }
                                {
                                    (data.TripList && data.TripList.length) ?
                                        <li className="mui-table-view-cell">
                                            {
                                                data.TripList.map((trip, index)=> {
                                                    return (
                                                        <div className="item-detail" key={"trip"+index}>
                                                            <span className="daytour-index">第{index + 1}天</span><span
                                                            className="daytour-title">{trip.TripTitle}</span>
                                                            <DayRouter data={trip.TripDetailList}/>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </li>
                                        :
                                        null
                                }
                                <li className="mui-table-view-divider">费用说明</li>
                                <li className="mui-table-view-cell field-value">
                                    <HTMLText html={data.CostIncludeDesc}/>
                                </li>
                            </ul>
                      :
                    <NormalError msg="请求失败, 点击刷新试试 -_-!" global={false}/>
                    }
                </div>
                {
                    data ?
                        <div className="mui-bar-footer action-btns">
                            <button className="mui-btn mui-btn-default mui-col-xs-4" onClick={()=>{Bridge.callPhone(data.Sales.Tel)}}><span className="mui-icon mui-icon-phone"></span>联系客服</button>
                            <Link to={{
                                pathname:"/product/booking/"+data.LineID,
                                state: {
                                    data: data,
                                    selectedDay: this.state.selectedDay
                                }
                            }} className="mui-btn mui-btn-warning mui-col-xs-8">立即预约</Link>
                        </div>
                        :
                    null
                }
                </div>

        )
    }
}
