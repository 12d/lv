/**
 * @author xuweichen@meitu.io
 * @date 1/22/17
 */
import React,{Component,PropTypes} from 'react';
import '../css/base.css';
import '../css/animate.css';
import '../css/mui-extra.css';
import '../css/app.css';
let isClientSide = typeof navigator !=='undefined';
export default class App extends Component {
    componentDidMount(){
        this._createAppIcons(this.props.appIcons);
    }
    static childContextTypes = {
        app: PropTypes.object
    }
    get runAt(){
        return isClientSide ? 'client' : 'server'
    }
    getChildContext(){
        return {
            app: this
        }
    }
    _createAppIcons(appIcons){
        var html="",
            link,
            head = document.head;

        for(let size in appIcons){
            link = document.createElement('link');
            link.setAttribute('sizes', size);
            link.setAttribute('rel', 'apple-touch-icon-precomposed');
            link.setAttribute('href', appIcons[size]);
            head.appendChild(link);
        }

    }
    render(){
        return (
            <div className="mui-view">
                <div className="mui-navbar">
                </div>
                <div className="mui-pages" id="app-container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}