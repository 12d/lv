/**
 * @author xuweichen@meitu.io
 * @date 11/1/16
 */
import React, {
    Component,
    PropTypes
} from 'react';

export default class HeaderView extends Component {
    static defaultProps = {
        right: [],
        title: '',
        left: []
    }
    render(){
        return (
            <header id="header" className="mui-bar mui-bar-nav navbar">
                <a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 className="mui-title">{this.props.title}</h1>
                {
                    this.props.right.map((btn,index)=>(
                        <button key={"right-btn"+index} onClick={btn.onClick} className="mui-btn mui-btn-blue mui-btn-link mui-pull-right">{btn.text}</button>
                    ))
                }
            </header>
        )
    }
}