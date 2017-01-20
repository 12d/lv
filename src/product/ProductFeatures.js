/**
 * @author xuweichen@meitu.io
 * @date 12/14/16
 */
import React,{
    Component
} from 'react';
import {Page, HTMLText,NormalError} from '../common/lv';
import '../css/product.css';
export default class ProductFeatures extends Page {
    headerview = {
        title: '旅游线路特色'
    }
    constructor(){
        super();
    }
    render(){
        var passedState = this.props.location.state;

        return this.create(
            passedState.features ?
                <HTMLText html={passedState && passedState.features} style={{padding:10}}/>
                : <NormalError msg="亲, 暂时没有数据"/>
        )
    }
}