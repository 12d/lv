/**
 * @author xuweichen@meitu.io
 * @date 12/15/16
 */
import React, {
    Component,
    PropTypes
} from 'react';

export default class NormalError extends Component {
    render(){
        return (
            <div style={!this.props.global?{position:'relative'}:{}}>
                <div className="error-container">
                    <div className="error-content">
                        <span className="mui-icon mui-icon-loop"></span>
                        <p className="error-msg">{this.props.msg}</p>
                    </div>
                </div>
            </div>
        )
    }
    static defaultProps = {
        msg: '',
        global: true
    }
}