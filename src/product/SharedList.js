/**
 * @author xuweichen@meitu.io
 * @date 12/12/16
 */
import React,{
    Component
} from 'react';

import Page from '../common/Page';
import ProductItem from './ProductItem';
import '../css/product.css';
export default class Index extends Page {
    static headerview = {

    }
    constructor(){
        super();
    }
    render(){
        //this.loadCSS(['/css/product.css']);
        return this.create(
            <ul className="mui-table-view order-list-container">
                <ProductItem/>
            </ul>
        )
    }
}