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
        // var list = this.props.location.query.id;
        // Model.post('/sharedline/getlinelist',{
        //     travellineidlist: list && list.split(','),
        //     pageindex:1,
        //     pagesize:20
        // },{
        //     useSecureCode: true
        // }).then((rs)=>{
        //     // debugger
        //     // console.log(rs.Data.Infos.List,'rs.Data.Info.List')
        //     this.setState({
        //         data: rs
        //     });
        //      this.needShowPromotion() && this.showPromotion();
        // });


        Index.prefetch(this.props.params, this.props)
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
        // this.getList();
    }
    render(){
        var data = this.state.data && this.state.data.Data.Infos;
        return this.create(
            data && data.List.length
                ?
            <ul className="mui-table-view order-list-container">
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