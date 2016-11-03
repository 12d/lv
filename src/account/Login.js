/**
 * @author xuweichen@meitu.io
 * @date 11/3/16
 */
/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
import React,{
    Component
} from 'react';
import {Link} from 'react-router';
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


    }
    render(){
        return this.create(
            <section className="login-form-container">
                <img src="/assets/logo-white.png" className="login-logo"/>

                <div className="login-row">
                    <input placeholder="输入您下单留的手机号" className="text-input"/>
                </div>
                <div className="login-row">
                    <div className="text-input verify-text-input">
                        <input placeholder="手机验证码" className="verify-text"/>
                    </div>
                    <button className="mui-btn get-verify-btn">获取验证码</button>

                </div>
                <div className="login-row">
                    <Link to="/order/list" className="mui-btn mui-btn-block login-btn">立即登录</Link>
                </div>


            </section>
        )
    }
}