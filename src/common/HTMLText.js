/**
 * @author xuweichen@meitu.io
 * @date 12/14/16
 */
import React, {
    Component,
    PropTypes
} from 'react';

export default class HTMLText extends Component {
    render(){
        return (
            <pre className="htmltext" ref="container" dangerouslySetInnerHTML={{__html: this.props.html}} style={this.props.style}>
            </pre>
        )
    }
    componentDidMount(){
    }
    get html(){

    }
    get html(){

    }
    static defaultProps = {
        html: ''
    }
}