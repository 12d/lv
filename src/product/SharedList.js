/**
 * @author xuweichen@meitu.io
 * @date 12/12/16
 */
import React,{
    Component
} from 'react';

import Page from '../common/Page';
import ProductItem from './ProductItem';

export default class Index extends Page {
    static headerview = {

    }
    constructor(){
        super();
    }
    render(){
        return this.create(
            <ul className="mui-table-view order-list-container">
                <ProductItem/>
            </ul>
        )
    }
}