/**
 * @author xuweichen@meitu.io
 * @date 1/22/17
 */
import React,{Component} from 'react';
import '../css/base.css';
import '../css/mui-extra.css';
import '../css/app.css';
export default class App extends Component {
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