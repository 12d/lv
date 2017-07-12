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
import Platform from './Platform';
import Dimensions from './Dimensions';
import TipSet,{Tip} from './TipSet';

let {width:screenWidth} = Dimensions.get('window');

export default class ShortcutTip extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <TipSet onComplete={function(){
                Storage.shortcutTip.setItem('visited', true);
                this.dismiss();

            }} ref={(tips)=>{this.tips = tips}} current={0}>
                {
                    Platform.vendor == 'wechat' ?
                    <Tip arrowPosition='top' offset={{right:5,top:10}} arrowOffset={{right:5,left:'auto'}}>
                        点击右上角菜单, 选择"收藏", 方便您下次访问
                    </Tip> : null
                }
                {
                    Platform.vendor == 'safari' ?
                    <Tip arrowPosition='bottom' offset={{left:screenWidth/2-100,bottom:11}} arrowOffset={{left:86}}>
                        点击下方按钮, 将微店添加到主屏幕 
                    </Tip> : null
                }
                {
                    Platform.vendor == 'chrome' ?
                        <Tip arrowPosition='top' offset={{right:5,top:10}} arrowOffset={{right:5,left:'auto'}}>
                            点击右上角菜单, 将微店添加到Chome主屏幕
                        </Tip> : null
                }
            </TipSet>
        )
    }
    componentDidMount(){
        // setInterval(()=>{
        //     // console.log(11)
        //     this.tips.prev();
        // },2000);
        // Storage.shortcutTip.setItem('visited', true);
    }
}
// export default class ShortcutTip extends Component {
//     constructor(){
//         super()
//     }
//     componentWillReceiveProps(newProps){
//         this.updateStatus(newProps.visible);
//     }
//     updateStatus(visible){
//         var dom = this.dom;
//         dom && dom.length && dom.popover(visible ? 'show' : 'hide');
//     }
//     componentDidMount(){
//         this.dom = mui('#RCT_shorcutTip');
//         this.updateStatus(this.props.visible);
//         // Storage.shortcutTip.setItem('visited', true);
//     }
//     renderFromSteps(steps){
//         return steps[1]
//     }
//     render(){
//         return this.renderFromSteps([
//             <div id="RCT_shorcutTip" className="shortcut-tip bottom mui-popover mui-popover-bottom rubberBand animated">
//                 <div className="mui-popover-arrow mui-bottom"></div>
//                 <div className="tip-message-container">
//                     {this.props.message}
//                 </div>
//             </div>,
//             <div>
//
//             </div>
//         ])
//     }
//     static defaultProps = {
//         visible: false
//     }
//     static propTypes = {
//         visible: PropTypes.bool
//     }
// }


/**
<Tips>
    <Tip>
        <View>1</View>
    </Tip>
    <Tip>
        <View>2</View>
    </Tip>
<Tips>
 */

