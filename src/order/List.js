/**
 * @author xuweichen@meitu.io
 * @date 10/28/16
 */
import React,{
    Component
} from 'react';

import Page from '../common/Page';
import OrderItem from './OrderItem';

export default class Index extends Page {
    static headerview = {

    }
    constructor(){
        super();
    }
    render(){
        return this.create(
            <ul className="mui-table-view order-list-container">
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
            </ul>
        )
    }
}