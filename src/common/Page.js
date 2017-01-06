'use strict';
import React, {
    Component,
    PropTypes
} from 'react';


import HeaderView from './HeaderView';
import ActivityIndicator from './ActivityIndicator';

import { browserHistory,hashHistory } from 'react-router';

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
    forward(pathname){
        history.push(pathname);
    }
    backward(){
        history.goBack();
    }
    contextTypes:{
        env: PropTypes.object,
        urlQuery: PropTypes.object
    }

    /**
     * 获取jsbundle中queryString中的参数
     * @param key
     */
    /**
     * 获取jsbundle中queryString中的参数
     * @param key
     */
    getParams(key:string) {
        return key ? this.props&&this.props.params&&this.props.params[key] : this.props.params
    }

    /**
     * 获取启动APP的环境变量
     * @param key
     */
    getEnv(key:string) {
        return key ? this.context.env[key] : this.context.env;
    }
    showLoading(container){

    }
    getInitialData(){
        return typeof window=='undefined' ? this.props.location.state : window.__INITIAL_STATE__[0]
    }
    // getInitialState(){
    //     return window.__INITIAL_STATE__;
    // }
    loadCSS(styles){
        this._stylesheets = styles;
    }
    create(content,stylesheets) {
        stylesheets =  stylesheets || this._stylesheets;

        return (
            <div className="mui-page app-page-container">
                <HeaderView {...this.headerview}/>
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

    }
    componentDidMount() {

        // this.header = this.refs.header;
    }



    showLoading() {
        console.log('showLoading')
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