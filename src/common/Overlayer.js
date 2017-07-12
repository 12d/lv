/**
 * @author xuweichen@meitu.io
 * @date 2017/7/12
 */
import React,{Component} from 'react';
export default class Overlayer extends Component {
    constructor(){
        super();
    }
    render(){
        return <div className="overlayer" {...this.props}>{this.props.children}</div>
    }
}