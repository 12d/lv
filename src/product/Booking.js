/**
 * @author xuweichen@meitu.io
 * @date 12/15/16
 */
import React,{
    Component
} from 'react';
import {Page,  Model, Store, Validator, Toast} from '../common/lv';
import {Link} from 'react-router';
var priceCalendarData = new Store('KEY_PRICE_CALENDAR');
import '../css/product.css';
export default class Booking extends Page {
    headerview = {
        title: '旅行预约'
    }
    constructor(){
        super();
        // router router回退也会触发constructor/componentWillMount/didMount, 如果有this.state={},会导致dom元素和内存的state不一致
        // this.state = {
        //     contact: '',
        //     mobile: '',
        //     childQuantity: 0,
        //     adultQuantity: 0
        // }
    }
    componentWillMount(){
        // priceCalendarData.clear();

    }
    validate(){
        return Validator.isMobile(this.state.mobile) && Validator.isNotEmpty(this.state.contact) && priceCalendarData;
    }

    submit(){

        if(this.validate()){
            this.showLoading();
            let adultPrice = this.dayPrice.CostPrice>0 ? this.dayPrice.CostPrice :  this.dayPrice.Price,
                childPrice = this.dayPrice.ChildPrice;

            Model.post('/sharedline/create',{
                contacts: {
                    name: this.state.contact,
                    mobile: this.state.mobile
                },
                orderInfo: {
                    productID: this.props.location.state.data.LineID,
                    amount: childPrice * Number(this.state.childQuantity) + adultPrice* Number(this.state.adultQuantity),
                    childPrice: childPrice,
                    adultPrice: adultPrice,
                    childCount: this.state.childQuantity,
                    adultCount: this.state.adultQuantity,
                    travelStartDate: Object.keys(priceCalendarData.getItem('selectedDay'))[0],
                },
                requestAuth: {
                    token: "ctripuser"
                }
            }).then((rs)=>{
                var info = rs.Data.Infos && rs.Data.Infos;
                this.hideLoading();
                this.forward({
                    pathname: '/order/'+info.vendorOrderId,
                    state: {
                        refer: 'booking'
                    }
                });
            })
        }else{
            Toast.show('请填写正确的联系人和联系电话')
        }
    }
    onInput(fieldName, e){
        this.state[fieldName] = e.target.value;
    }
    render(){
        var passedState = this.props.location.state,
            selectedDayData = priceCalendarData.getItem('selectedDay'),
            detailData = passedState && passedState.data,
            daystr = selectedDayData && Object.keys(selectedDayData)[0],
            dayinfo = selectedDayData && selectedDayData[daystr] || {}

        this.dayPrice = dayinfo;
        return this.create(
            detailData && detailData.LinePicList ?
            <div>
                <ul className="mui-table-view order-fill">
                    <li className="mui-table-view-cell mui-media">
                        <div>
                            {
                                detailData.LinePicList[0] ? <img className="mui-media-object mui-pull-left" src={detailData.LinePicList[0].PicturePath}/> : null
                            }
                            <div className="mui-media-body">
                                {detailData.LineName}
                            </div>
                        </div>

                    </li>
                    <li className="mui-table-view-divider"></li>
                    <li className="mui-table-view-cell">
                        <span className="mui-icon-extra mui-icon-extra-calendar"></span><span>出行时间</span>
                        <Link to={{pathname:"/product/"+this.props.params.id+"/pricecalendar"}} className="modify-date mui-pull-right"><span className="modify-date-btn">{selectedDayData?"更改":"选择"}</span></Link>
                        <span className="mui-pull-right field-value">
                            {daystr || '请选择出行日期'}
                        </span>
                    </li>
                    <li className="mui-table-view-divider">出行人数</li>
                    <li className="mui-table-view-cell">
                        <span>成人</span>
                        <span className="mui-pull-right field-value">
                            <input className="info-fill" type="number" placeholder="请输入成人数" onInput={this.onInput.bind(this,'adultQuantity')}/>
                        </span>
                    </li>
                    <li className="mui-table-view-cell">
                        <span>儿童</span>
                        <span className="mui-pull-right field-value">
                            <input className="info-fill" type="number" placeholder="请输入儿童数" onInput={this.onInput.bind(this,'childQuantity')}/>
                        </span>
                    </li>
                    <li className="mui-table-view-divider"></li>
                    <li className="mui-table-view-cell fill-required">
                        <span className="mui-icon mui-icon-person"></span><span>联系人</span>
                        <input placeholder="请输入联系人姓名" className="info-fill" onInput={this.onInput.bind(this,'contact')} type="text"/>
                    </li>
                    <li className="mui-table-view-cell fill-required">
                        <span className="mui-icon-extra mui-icon-extra-phone" style={{marginTop:0}}></span><span>联系电话</span>
                        <input placeholder="请输入联系人的手机号" className="info-fill" onInput={this.onInput.bind(this,'mobile')} type="tel"/>
                    </li>
                    <li className="mui-table-view-divider">价格</li>
                    <li className="mui-table-view-cell">
                        <span>成人价</span>
                        <span className="mui-pull-right field-value">
                            ¥&nbsp;{dayinfo.Price || "--"}
                        </span>
                    </li>
                    <li className="mui-table-view-cell">
                        <span>儿童价</span>
                        <span className="mui-pull-right field-value">
                            ¥&nbsp;{dayinfo.ChildPrice || "--"}
                        </span>
                    </li>

                    <li className="mui-table-view-divider"></li>
                    <li className="mui-table-view-cell">
                        <span>付款方式</span>
                        <span className="mui-pull-right field-value">
                            线下支付
                        </span>
                    </li>

                </ul>
                <p style={{fontSize:12,textAlign:'center',paddingBottom:60,marginTop:10}}>提交订单后客服会在第一时间联系您, 请注意接听来电</p>
                <div className="mui-bar-footer action-btns">

                    <button className="mui-btn mui-btn-warning mui-col-xs-12" onClick={this.submit.bind(this)}>提交预约</button>
                </div>
            </div>
            :
            null
        )
    }
}