/**
 * @author xuweichen@meitu.io
 * @date 3/2/17
 */
import React,{
    Component
} from 'react';
import {Link } from 'react-router'
import {Page,ImageSlider,Model,Toast,NormalError,Bridge} from '../common/lv';
import '../css/shopdetail.css';
import ProductItem from '../product/ProductItem';
/**
 * WeiStoreID = model.WeiStoreID;
 Title = model.Title;
 Description = model.Description;
 LogoUrl = model.LogoUrl;
 BannerUrl = model.BannerUrl;
 Contact = model.Contact;
 */
export default class Index extends Page {
    headerview = {
        title: '微店首页'
    }
    constructor(){

        super();
    }

    componentWillMount(){
        this.state = {
            data: this.getInitialData()
        }
        // debugger
        let shopID = this.props.params.id;
        this.shopID = shopID;


    }
    static prefetch(params){
        return Model.post('/sharedline/getweistore',{
            key: params.id
        },{useAuth:false})
    }

    componentDidMount(){
        var shopID = this.shopID;
        this.getStats(shopID);
        this.getHotlines(shopID);
    }
    getHotlinesFail(){
        this.setState({
            hotlines: []
        })
    }
    getHotlines(shopID){
        Model.post('/sharedline/getlinelist',{
            pageindex:1,
            pagesize:5,
            sort:'2_1',
            travelstoreid: this.props.params.id
        },{useAuth:false}).then((rs)=>{
            this.setState({
                hotlines: rs.Data.Infos.List
            })
        }).catch(()=>{
            this.getHotlinesFail()
        })
    }
    getStats(shopID){
        Index.prefetch({
            id: shopID
        }).then((rs)=>{
            this.setState({
                data: rs
            })
        }).catch(()=>{
            Toast.show('加载失败,请刷新重试')
        })
    }
    goOrderList(){

        this.forward('/order/list');
    }
    goProductList(){
        this.showLoading();
        this.forward('/product/list?shop='+this.props.params.id);
    }
    render(){
        var data = this.state.data.Data,
            stats = data && data.Infos || {};
        console.log(stats)
        return this.create(
            <div>
                <div className="mui-scroll mui-content" style={{marginBottom:60}}>
                    <ImageSlider style={{height:120}} data={[{"pictureID":0,"PictureName":"","PicturePath":stats.BannerUrl}]}/>

                    <div className="mui-table-view page-section shop-info">
                        <img className="mui-media-object mui-pull-left list-img shop-logo" src={stats.LogoUrl||"http://www.meitu.io//static/images/noimg.png"}/>
                        <h1 className="product-name shop-name">{stats.Title}<b className="shop-verified">V</b></h1><p className="shop-data"><span className="prices"><span className="stars">112 人收藏</span></span><span className="">今日收客数 {stats.OrderPersonCount}</span></p>
                        <p className="shop-desc">{stats.Description}
                        </p>
                    </div>
                    {
                        this.state.hotlines&&this.state.hotlines.length ?
                            <div className="title hotline-title">
                                热门线路
                                <div onClick={()=>this.goProductList()} className="mui-pull-right">更多&raquo;</div>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.hotlines&&this.state.hotlines.length ?
                            <ul className="mui-table-view product-list-container hotline-list">
                                {
                                    this.state.hotlines.map((itemData, index)=> {
                                        return (
                                            <ProductItem data={itemData} key={'pitem'+index}/>
                                        )
                                    })
                                }
                            </ul>:
                            <NormalError msg="暂无热门线路" global={false}/>
                    }
                </div>

                    <nav className="mui-bar mui-bar-footer mui-bar-tab">
                        <div className="mui-tab-item" onClick={()=>this.goProductList()}>
                            <span className="mui-icon mui-icon-list"></span>
                            <span className="mui-tab-label">所有线路</span>
                        </div>
                        {
                            /*
                        <a className="mui-tab-item" href="#">
                            <span className="mui-icon mui-icon-extra mui-icon-extra-heart"></span>
                            <span className="mui-tab-label">收藏店铺</span>
                        </a>*/
                        }
                        <div className="mui-tab-item" onClick={()=>Bridge.callPhone(stats.Contact)}>
                            <span className="mui-icon mui-icon-phone" style={{fontSize:22}}></span>
                            <span className="mui-tab-label">联系我们</span>
                        </div>
                        <div onClick={()=>this.goOrderList()} className="mui-tab-item">
                            <span className="mui-icon mui-icon-extra mui-icon-extra-order"></span>
                            <span className="mui-tab-label">我的订单</span>
                        </div>
                    </nav>
            </div>
        )
    }
}