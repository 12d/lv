/**
 * @author xuweichen@meitu.io
 * @date 2017/7/12
 */
import React,{Component,PropTypes} from 'react';
import Overlayer from './Overlayer';
export class Tip extends Component{
    constructor(){
        super()
    }
    componentWillMount(){

    }
    componentWillReceiveProps(newProps){
        this.setState({
            ...newProps
        })
    }
    render(){
        return  (
            <div style={this.props.offset} className="shortcut-tip mui-popover mui-active rubberBand animated">
                <div className={`mui-popover-arrow mui-${this.props.arrowPosition}`} style={this.props.arrowOffset}></div>
                <div className="tip-message-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
    static propTypes = {

        offset: PropTypes.shape({
            left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        }),
        arrowPosition: PropTypes.oneOf(['left','right','top','bottom']),
        arrowOffset: PropTypes.shape({
            left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    }
}

export default class Tips extends Component {
    constructor(){
        super();

    }
    componentWillMount(){
        this.state = {
            current: this.props.current,
            visible: true
        }

    }
    next(){
        let next = this.state.current+1;
        this.props.onStep.call(this);
        if(next>=this._tipsCount){
            this.props.onComplete.call(this);
            // next=0;
        }
        this.setState({
            current: next
        });

    }
    prev(){
        this.props.onStep.call(this);

        let next = this.state.current-1;
        if(next<0){
            next=this._tipsCount-1;
        }
        this.setState({
            current: next
        });
    }
    dismiss(){
        this.setState({
            visible: false
        })
    }
    componentWillReceiveProps(){
        let children = this.props.children;
        if(children && !Array.isArray(children)){
            children= [children];
        }
        this._tipsCount = children.filter(function(c){
                if(c) return c
            }).length||0;
    }
    render(){
        let children = this.props.children;
        if(children && !Array.isArray(children)){
            children= [children];
        }
        children = children &&children.filter(function(c){
            if(c) return c
        });
        return (
            this.state.visible
                ?
                <Overlayer onClick={this.props.onClick.bind(this)}>
                    {children[this.state.current]}
                </Overlayer>
                :
                null
        )
    }
    static defaultProps = {
        current: 0,
        onClick: function(){
            this.next();
        },
        onStep: function(){
            // console.log('onStep')
        },
        onComplete: function(){
            this.dismiss();
        }
    }
}
