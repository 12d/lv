/**
 * @author xuweichen@meitu.io
 * @date 12/12/16
 */
import React,{
    Component
} from 'react';

import ProductItem from './ProductItem';
import {Model,Page,Prompt,Store,NormalError} from '../common/lv';
var secureCodeStore = new Store('SECURE_CODE');
var pageInstance;
var visitedTagStore = new Store('VISITED_TAG',{},{lifetime: '1D'});
import '../css/product.css';
export default class Index extends Page {
    static prefetch(params, props){

        var list = props.location.query.id;
        return Model.post('/sharedline/getlinelist',{
            travellineidlist: list && list.split(','),
            pageindex:1,
            pagesize:20
        },{
            useSecureCode: true
        })
    }
    headerview = {
        title: '热门线路推荐',
        right: [
            {
                text: '优惠码',
                onClick(){
                    pageInstance.showPromotion();
                }
            }
        ]
    }
    constructor(){
        super();
        pageInstance = this;
    }
    componentWillMount(){

        this.state = {
            data: this.getInitialData()
        }
        this.urlQuery = this.props.location.query;
    }
    getList(){
        Index.prefetch({},this.props).then((rs)=>{
            var listInfos = rs.Data.Infos,
                firstLine = listInfos &&listInfos.List && listInfos.List[0];

            firstLine && this.wechatReady(()=>{
                this.wechat.share({
                    title: '我在美途旅旅发现了很赞的旅行线路, 快看看~~', // 分享标题
                    desc: '\"'+firstLine.LineName+'\"等'+listInfos.List.length+'条精美线路', // 分享描述
                    link: location.href, // 分享链接
                    imgUrl: firstLine.LinePicList[0] && firstLine.LinePicList[0].PicturePath, // 分享图标
                });
            })
            this.setState({
                data: rs
            });
            this.needShowPromotion() && this.showPromotion();
        }).catch((e)=>{
            this.setState({
                data: null
            })
        });
    }
    needShowPromotion(){
        return !visitedTagStore.getItem('visited') && !secureCodeStore.getItem()
    }
    checkPromotionCode(secureCode){
        secureCodeStore.setItem({secureCode});
    }
    showPromotion(){
        var self = this;

        Prompt.show({
            yesLabel:'立即查看',
            noLabel:'没有优惠码',
            onYes(e){
                visitedTagStore.setItem('visited',1);
                self.checkPromotionCode(e.value);
                self.getList();
            },
            onNo(){
                visitedTagStore.setItem('visited',1);
                // console.log('no')
            },
            title: '优惠码',
            message: '输入优惠码, 查看更低价格'
        })
    }
    componentDidMount(){
        this.getList();
    }
    render(){
        var data = this.state.data && this.state.data.Data.Infos;
        return this.create(
            data && data.List.length
                ?
            <ul className="mui-table-view product-list-container">
                {
                    this.state.data.Data.Infos.List.map((itemData, index)=>{
                        return (
                            <ProductItem data={itemData} key={'pitem'+index}/>
                        )
                    })
                }
            </ul>
                :
            <NormalError msg="暂时没有数据"/>
        )
    }
}