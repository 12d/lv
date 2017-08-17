'use strict';
import React, {
    Component,
    PropTypes
} from 'react';


import HeaderView from './HeaderView';
import ActivityIndicator from './ActivityIndicator';

import { browserHistory,hashHistory } from 'react-router';
import Util from './Util';
// import '../css/base.css';
// import '../css/mui-extra.css';
// import '../css/app.css';

var history = browserHistory;

const NOOP = ()=> {
}
class Page extends Component {
    static forward(pathname){
        history.push(pathname);
    }
    static backward(){
        history.goBack();
    }
    constructor(){
        super();

    }

    forward(pathname){
        history.push(pathname);
    }
    backward(){
        history.goBack();
    }
    replace(pathname){
        history.replace(pathname);
    }
    static contextTypes = {
        env: PropTypes.object,
        urlQuery: PropTypes.object,
        app: PropTypes.object
    }

    /**
     * 获取url中queryString中的参数
     * @param key
     */
    getParams(key:string) {
        var params = {...this.props.params, ...this.props.location.query}
        return key ? params[key] : params;
    }

    /**
     * 获取启动APP的环境变量
     * @param key
     */
    getEnv(key:string) {
        return key ? this.context.env[key] : this.context.env;
    }

    /**
     * 阅后即焚读取初始化数据
     * @returns {Array}
     */
    getInitialData(){
        var data;
        // return typeof window=='undefined' ? this.props.location.state : window.__INITIAL_STATE__;
        if(this.__initialData){
            return this.__initialData;
        }
        if(typeof window=='undefined'){
            data = this.props.location.state;
        }else{
            data = Object.assign({}, window.__INITIAL_STATE__);
            window.__INITIAL_STATE__ = null;

        }
        this.__initialData = data;
        return data;
    }
    // getInitialState(){
    //     return window.__INITIAL_STATE__;
    // }
    loadCSS(styles) {
        this._stylesheets = styles;
    }
    setHeader(headerOptions){
        this.header.update(headerOptions);

        this.context.app.runAt=='client' && (document.title=headerOptions.title);
    }
    setTitle(title){
        this.setHeader({
            title
        });
    }
    create(content,stylesheets) {
        stylesheets =  stylesheets || this._stylesheets;

        return (
            <div className="mui-page app-page-container">
                {
                    this.headerview
                        ?
                    <HeaderView {...this.headerview} ref={(el)=>{
                        this.header = el;
                    }}/>
                        :
                    null
                }
                {
                    stylesheets ? stylesheets.map((href)=>(<link href={href} rel="stylesheet"/>)) : null

                }
                {content}
                {
                    this.state && this.state.isLoading ?
                        <div className="mui-backdrop">
                            <ActivityIndicator/>
                        </div>
                    :
                        null
                }

            </div>
        )
    }
    componentWillMount(){
        this.app = this.context.app;
    }
    componentDidMount() {

    }

    wechatReady(callback){
        if(Util.UA.wechat){

            require.ensure(['./WechatShare'], (require)=>{
                var WechatShare = require('./WechatShare').default;
                this.wechat = new WechatShare();
                this.wechat.ready(callback)
            })
        }
    }

    showLoading() {
        this.setState({
            isLoading: true
        })
    }

    hideLoading() {
        this.setState({
            isLoading: false
        })
    }

    /**
     * @description connect to redux
     * @static
     * @param klass
     * @param actions actions for this page
     * @param mapStateProps map state to props
     * @returns {*}
     */
    static connect(klass, actions, mapStateProps) {
        return connect(
            mapStateProps || NOOP,
            (dispatch, props)=> {
                return bindActionCreators(actions, dispatch)
            }
        )(klass)
    }

}

// export default

export default Page;