/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
import React,{
    Component
} from 'react';

import {Page, Model, UserHelper,NormalError} from '../common/lv';
import OrderItem from './OrderItem';
import '../css/order.css';
export default class Index extends Page {
    headerview = {
        title: '我的订单列表',
        right: [{
            text: '切换用户',
            onClick(){
                Page.forward('/login')
            }
        }]
    }
    componentWillMount(){
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        this.showLoading();

        if(!UserHelper.isLogin()){
            this.replace('/login');
            return;
        }

        Model.post('/sharedline/getorderlist',{
            contactTel: UserHelper.getUser().mobile
        }).then((rs)=>{
            this.hideLoading();
            this.setState({
                data: rs.Data.Infos && rs.Data.Infos.List || []
            })
        }).catch(e=>{
            //error
        })
    }
    constructor(){
        super();
    }
    render(){
        // this.loadCSS(['/css/order.css']);
        return this.create(
            this.state.data.length
            ?
            <ul className="mui-table-view order-list-container">
                {
                    this.state.data.map((item,index)=>(
                        <OrderItem data={item} key={'item'+index}/>
                    ))
                }
            </ul>
            :
            <NormalError msg="没有查到数据, 切换其他下单手机号试试"/>
        )
    }
}
