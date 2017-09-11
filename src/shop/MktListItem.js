import React,{
    Component
} from 'react';
import {Link } from 'react-router'
import {Page, Image} from '../common/lv';
const DEFAULT_IMAGE = 'http://www.meitu.io//static/images/noimg.png';
import '../css/product.css';
export default class MktListItem extends Component {
    constructor(){
        super();

    }
    render(){

        var data = this.props.data,
            imgSRC = data.FirstPicturesPath || DEFAULT_IMAGE;

        return (
            <Link to={"/mkt/"+data.PostID}>
            <li className="mui-table-view-cell mui-media mui-card custom-list">
                {
                    /*<span className="line-typename">{data.LineTypeName}</span>*/
                }
                    <div className="custom-list-content">
                        <Image src={imgSRC} className="mui-media-object mui-pull-left list-img" cropMode="100_100"/>
                        <div className="mui-media-body product-name product-list-name mkt-name">
                            {data.Title}
                        </div>
                        {
                            /*<p className="product-spotlight">{data.RecommendReason}</p>*/
                        }
                    </div>
                    <span className="order-price-wrap">{data.DataChange_LastTime}</span>
                    <span className="order-total">已读&nbsp;{data.ViewCount||0}</span>
            </li>
            </Link>
        )
    }
}