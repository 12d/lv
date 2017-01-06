/**
 * @author xuweichen@meitu.io
 * @date 12/14/16
 */
import React,{
    Component
} from 'react';
import {Page, HTMLText} from '../common/lv';
export default class ProductFeatures extends Page {
    headerview = {
        title: '旅游线路特色'
    }
    constructor(){
        super();
    }
    render(){
        var passedState = this.props.location.state;
        this.loadCSS(['/css/product.css']);
        return this.create(
            <HTMLText html={passedState && passedState.features} style={{padding:10}}/>
        )
    }
}