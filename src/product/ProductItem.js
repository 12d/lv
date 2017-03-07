import React,{
    Component
} from 'react';
import {Link } from 'react-router'
import Page from '../common/Page';
const DEFAULT_IMAGE = 'http://www.meitu.io//static/images/noimg.png';
import '../css/product.css';
export default class ProductItem extends Component {
    constructor(){
        super();
    }
    render(){
        var data = this.props.data,
            imgSRC = data.LinePicList.length && data.LinePicList[0].PicturePath || DEFAULT_IMAGE
        return (
            <li className="mui-table-view-cell mui-media mui-card custom-list">
                <span className="line-typename">{data.LineTypeName}</span>
                <div onClick={()=>Page.forward("/product/"+data.LineID)} className="custom-list-content">
                    <img src={imgSRC} className="mui-media-object mui-pull-left list-img"/>
                    <div className="mui-media-body product-name product-list-name">
                        <span className="from-city">[{data.FromCityName}出发]</span>{data.LineName}
                    </div>
                    <p className="product-spotlight">{data.RecommendReason}</p>
                    <span className="order-price-wrap"><span className="order-price">￥{data.LowestCostPrice>0 ? data.LowestCostPrice: data.LowestPrice}</span>{data.LowestCostPrice>0?'批发价':'起'}</span>
                    <span className="order-total">已售&nbsp;981</span>
                </div>

            </li>
        )
    }
}