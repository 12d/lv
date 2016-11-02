'use strict';
import React, {
    Component,
    PropTypes
} from 'react';


// import Theme from '../skins/Theme';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import HeaderView from './HeaderView';
const NOOP = ()=> {
}
class Page extends Component {
    // mixins: [UBTMixin],
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

    create(content) {
        return (
            <div className="mui-page app-page-container">
                <HeaderView/>
                {content}
            </div>
        )
    }

    componentDidMount() {
        // this.header = this.refs.header;
    }

    forward(component, headerview, passProps) {
        if (!component.dispatch) {
            component.dispatch = this.props.reduxStore && this.props.reduxStore.dispatch;
        }
        console.log(passProps, 'passProps')
        this.props.navigator.push({
            component,
            headerview: {...component.headerview, ...headerview},
            passProps: passProps
        });
        component.prefetch && component.prefetch(passProps) || false;
    }

    backward() {
        this.props.navigator.pop()
    }

    setLazyState(state, callback) {
        // console.log('start render')
        InteractionManager.runAfterInteractions(()=> {
            // console.log('complete render')
            this.setState(state, callback)
        })
    }

    showLoading() {

    }

    hideLoading() {

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