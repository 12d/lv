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
        left: [<a className="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>]
    }
    update(options){
        this.setState({
            ...options
        })
    }
    componentWillMount(){
        this.state = {
            ...this.props
        }
    }
    render(){
        return (
            <header id="header" className="mui-bar mui-bar-nav navbar">
                {
                    Array.isArray(this.state.left) ? this.state.left.map(item=>item) : this.state.left
                }
                <h1 className="mui-title">{this.state.title}</h1>
                {
                    this.props.right.map((btn,index)=>(
                        <button key={"right-btn"+index} onClick={btn.onClick} className="mui-btn mui-btn-blue mui-btn-link mui-pull-right">{btn.text}</button>
                    ))
                }
            </header>
        )
    }
}