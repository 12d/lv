/**
 * @author xuweichen@meitu.io
 * @date 12/14/16
 */
import React, {
    Component,
    PropTypes
} from 'react';

export default class ActivityIndicator extends Component {
    render(){
        return (
            <div className="activity-indicator">
                <span className="mui-spinner"></span>
            </div>
        )
    }
    componentDidMount(){
    }
}