/**
 * @author xuweichen@meitu.io
 * @date 11/1/16
 */
import React, {
    Component,
    PropTypes
} from 'react';

export default class HeaderView extends Component {
    render(){
        return (
            <header className="mui-bar mui-bar-nav navbar">
                <div className="mui-action-back mui-icon mui-icon-left-nav" style={{visibility:"hidden"}}></div>
                <div className="mui-title">美途旅旅</div>
                <div className="navbar-right"></div>
            </header>
        )
    }
}