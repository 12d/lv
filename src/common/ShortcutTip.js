/**
 * @author xuweichen@meitu.io
 * @date 2017/7/10
 * @depends mui
 */
import React,{
    Component,
    PropTypes
} from 'react'
import Storage from '../Storage';
export default class ShortcutTip extends Component {
    constructor(){
        super()
    }
    componentWillReceiveProps(newProps){
        this.updateStatus(newProps.visible);
    }
    updateStatus(visible){
        var dom = this.dom;
        dom && dom.length && dom.popover(visible ? 'show' : 'hide');
    }
    componentDidMount(){
        this.dom = mui('#RCT_shorcutTip');
        this.updateStatus(this.props.visible);
        Storage.shortcutTip.setItem('visited', true);
    }
    render(){
        return (
            <div id="RCT_shorcutTip" className="shortcut-tip bottom mui-popover mui-popover-bottom rubberBand animated">
                <div className="mui-popover-arrow mui-bottom"></div>
                <div className="tip-message-container">
                    {this.props.message}
                </div>
            </div>
        )
    }
    static defaultProps = {
        visible: false
    }
    static propTypes = {
        visible: PropTypes.bool
    }
}


