'use strict';
import React, {
    Component,
    PropTypes
} from 'react';


import HeaderView from './HeaderView';
import ActivityIndicator from './ActivityIndicator';

import { browserHistory } from 'react-router';

const NOOP = ()=> {
}
class Page extends Component {
    static forward(pathname){
        browserHistory.push(pathname);
    }
    static backward(){
        browserHistory.goBack();
    }
    forward(pathname){
        browserHistory.push(pathname);
    }
    backward(){
        browserHistory.goBack();
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
    create(content) {
        return (
            <div className="mui-page app-page-container">
                <HeaderView {...this.headerview}/>
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
        window.x = this;
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