import React,{
    Component
} from 'react';
import {Link } from 'react-router'
import Page from '../common/Page';
const DEFAULT_IMAGE = 'placeholder.png';
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
                <Link to={"/product/"+data.LineID} className="custom-list-content">
                    <img className="mui-media-object mui-pull-left list-img" src={imgSRC}/>
                    <div className="mui-media-body product-name product-list-name">
                        <span className="from-city">[{data.FromCityName}出发]</span>{data.LineName}
                    </div>
                    <p className="product-spotlight">{data.RecommendReason}</p>
                </Link>
                <div className="order-agent gray-font ">
                    <span>{data.TravelStoreName}</span>
                    <span className="order-price-wrap"><span className="order-price">￥{data.LowestCostPrice>0 ? data.LowestCostPrice: data.LowestPrice}</span>{data.LowestCostPrice>0?'批发价':'起'}</span>
                </div>
            </li>
        )
    }
}