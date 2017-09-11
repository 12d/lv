/**
 * @author xuweichen@meitu.io
 * @date 3/9/17
 */
import React,{Component} from 'react';
export default class Image extends Component {
    constructor(){
        super()
    }
    render(){
        
        return <img {...this.props} src={this.props.src+(this.props.cropMode?"?x-oss-process=style/"+this.props.cropMode:'')}/>
    }
    static defaultProps = {
        cropMode: ''
    }
}