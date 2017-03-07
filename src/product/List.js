/**
 * @author xuweichen@meitu.io
 * @date 12/12/16
 */
import React,{
    Component
} from 'react';

import ProductItem from './ProductItem';
import {Model,Page,Prompt,Store,NormalError,Toast,Spy} from '../common/lv';
var secureCodeStore = new Store('SECURE_CODE');
var pageInstance;
var visitedTagStore = new Store('VISITED_TAG',{},{lifetime: '1D'});
import '../css/product.css';
export default class Index extends Page {
    static prefetch(params, props){

        var list = props.location.query.id;
        var paramsObj = {
            pageindex:1,
            pagesize:12,
            ...params
        }
        if(list){
            paramsObj.travellineidlist= list.split(',')
        }else{
            paramsObj.travelstoreid = props.location.query.shop
        }
        return Model.post('/sharedline/getlinelist',paramsObj,{
            useSecureCode: true
        })
    }
    headerview = {
        title: '线路列表',
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
        console.log('init here')
        super();
        pageInstance = this;
    }
    componentWillMount(){

        this.state = {
            data: this.getInitialData()
        }
        this.urlQuery = this.props.location.query;
    }
    sharedHandler(){
        Toast.show('分享成功');
        Spy.send({
	    storeid: this.getParams('storeid'),
            token: btoa((+new Date)+this.getParams('owner')),
            owner: parseInt(this.getParams('owner')),
            pids: this.getParams('id').split(',')
        })
    }
    mergeList(rs){
        var listInfos = rs.Data.Infos;

        if(listInfos && listInfos.List && listInfos.PageIndex>1){
            listInfos.List = this.state.data.Data.Infos.List.concat(listInfos.List);

        }
        return rs
    }
    getList(params){
        Index.prefetch(params,this.props).then((rs)=>{
            var listInfos = rs.Data.Infos,
                firstLine = listInfos &&listInfos.List && listInfos.List[0];

            firstLine && this.wechatReady(()=>{
                this.wechat.share({
                    title: this.getParams('sharetitle')||'我在美途旅旅发现了很赞的旅行线路, 快看看~~~', // 分享标题
                    desc: '\"'+firstLine.LineName+'\"等'+listInfos.List.length+'条精美线路', // 分享描述
                    link: location.href, // 分享链接
                    imgUrl: firstLine.LinePicList[0] && firstLine.LinePicList[0].PicturePath, // 分享图标
                });
                this.wechat.on('all', this.sharedHandler.bind(this))
            });
            rs = this.mergeList(rs);
            this.setState({
                data: rs
            },()=>{

                setTimeout(()=>{
                    // debugger
                    var pullRefresh = mui('#pullrefresh').pullRefresh();
                    //重置滚动条
                    (!params||params.pagesize==1) &&pullRefresh.refresh(true);
                    var isEnd = !rs.Data.Infos.HasNextPage;
                    pullRefresh.enablePullupToRefresh();
                    pullRefresh.endPullupToRefresh(isEnd);
                },100)
            });

                this.initPullRefrech();

            this.hideLoading();
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
    fetchMore(){
        this.getList({
            pageindex: this.state.data.Data.Infos.PageIndex + 1
        });
    }
    initPullRefrech(){

        var self = this;
        mui.init({
            pullRefresh: {
                container: '#pullrefresh', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
                up: {
                    // height: 50, //可选.默认50.触发上拉加载拖动距离
                    contentinit:'上拉可显示更多路线',
                    contentdown:'上拉可显示更多路线',
                    duration: 300,
                    auto: false, //可选,默认false.自动上拉加载一次
                    // contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '没有更多路线了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function(){
                        self.fetchMore();
                    }//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });

        // this.initPullRefrech=()=>{}
    }
    componentWillUnmount(){
        mui.destruct()
    }
    componentDidMount(){
        !(this.state.data.Data && this.state.data.Data.Infos) && (this.showLoading(), this.getList());
    }
    render(){
        var data = this.state.data && this.state.data.Data&& this.state.data.Data.Infos;
        return this.create(
            data && data.List.length
                ?
                <div id="pullrefresh" className="mui-content mui-scroll-wrapper">
                    <div className="mui-scroll">
            <ul className="mui-table-view product-list-container">
                {
                    this.state.data.Data.Infos.List.map((itemData, index)=>{
                        return (
                            <ProductItem data={itemData} key={'pitem'+index}/>
                        )
                    })
                }
            </ul></div></div>
                :
            <NormalError msg="暂时没有数据"/>
        )
    }
}
