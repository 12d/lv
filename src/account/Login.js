/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
import React,{
    Component
} from 'react';
import {Link} from 'react-router';
import {Page, Validator,Toast,Bridge,UserHelper} from '../common/lv';
import from '../css/account.css';
export default class Login extends Page {
    headerview = {
        title: '登录'
    }
    constructor(){
        super();
    }
    componentWillMount(){
        this.state = {
            mobile: null
        }

    }
    validate(){
        return Validator.isMobile(this.state.mobile)
    }
    submit(){
        if(this.validate()){
            UserHelper.login({
                mobile: this.state.mobile
            })
            this.forward("/order/list");
        }else{
            Toast.show('手机号无效, 请重新输入');
        }
    }
    onMobileInput(e){
        this.state.mobile = e.target.value;
    }
    callPhone(){
        Bridge.callPhone('15618870543');
    }
    render(){
        // this.loadCSS(['css/account.css']);
        return this.create(
            <section className="login-form-container">
                <img src="assets/logo-white.png" className="login-logo"/>
                <div className="login-row">
                    <input placeholder="输入您下单留的手机号" className="text-input" type="number" onInput={this.onMobileInput.bind(this)}/>
                </div>
                <div className="login-row" style={{display:'none'}}>
                    <div className="text-input verify-text-input">
                        <input placeholder="手机验证码" className="verify-text"/>
                    </div>
                    <button className="mui-btn get-verify-btn">获取验证码</button>

                </div>


                <div className="login-row">
                    <button className="mui-btn mui-btn-block login-btn" onClick={this.submit.bind(this)}>立即查询</button>
                </div>
                <p className="contact-us" onClick={this.callPhone}><span className="mui-icon mui-icon-phone"></span>联系美途旅旅</p>
            </section>
        )
    }
}