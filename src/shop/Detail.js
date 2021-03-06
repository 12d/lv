/**
 * @author xuweichen@meitu.io
 * @date 3/2/17
 */
import React,{
    Component
} from 'react';
import {Link } from 'react-router'
import {Page,ImageSlider,Model,Toast,NormalError,Bridge,Image,ShortcutTip,Platform} from '../common/lv';
import '../css/shopdetail.css';
import ProductItem from '../product/ProductItem';
import Storage from '../Storage';
/**
 * WeiStoreID = model.WeiStoreID;
 Title = model.Title;
 Description = model.Description;
 LogoUrl = model.LogoUrl;
 BannerUrl = model.BannerUrl;
 Contact = model.Contact;
 */
export default class ShopDetail extends Page {
    headerview = {
        title: '微店首页',
        left: null
    }
    constructor(){

        super();
    }

    componentWillMount(){
        this.state = {
            data: this.getInitialData(),
            visited: Storage.shortcutTip.getItem('visited')
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
            userid: this.props.params.id
        },{useAuth:false}).then((rs)=>{

            this.setState({
                hotlines: rs.Data.Infos.List
            });


        }).catch(()=>{
            this.getHotlinesFail()
        })
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
    goNews(){
        this.showLoading();
        this.forward('/mkt/list/'+this.props.params.id);
    }
    getStats(shopID){
        ShopDetail.prefetch({
            id: shopID
        }).then((rs)=>{
            this.setState({
                data: rs
            });
            let shopTitle = rs.Data.Infos.Title+"微门店首页";
            this.wechatReady(()=> {
                this.wechat.share({
                    title: this.getParams('sharetitle') || '我在美途旅旅发现了一家很赞的旅行社微门店 - '+rs.Data.Infos.Title, // 分享标题
                    desc: shopTitle, // 分享描述
                    link: location.href, // 分享链接
                    imgUrl: rs.Data.Infos.LogoUrl, // 分享图标
                });
                this.wechat.on('all', this.sharedHandler.bind(this))
            });
            this.setTitle(shopTitle);
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

        return this.create(
            <div>
                <div className="mui-scroll mui-content" >
                    <div className="mui-table-view page-section shop-info">
                        <Image className="mui-media-object mui-pull-left list-img shop-logo" src={stats.LogoUrl||"http://www.meitu.io//static/images/noimg.png"} cropMode="100_100"/>
                        <h1 className="product-name shop-name">{stats.Title}<b className="shop-verified">V</b></h1><p className="shop-data"></p>
                        <p className="shop-desc">{stats.Description}
                        </p>
                    </div>
                    <ImageSlider style={{height:120}} data={[{"pictureID":0,"PictureName":"","PicturePath":stats.BannerUrl}]} cropMode="375_120"/>
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

                        <div className="mui-tab-item">
                            <span className="mui-icon mui-icon mui-icon-star" onClick={()=>this.goNews()}></span>
                            <span className="mui-tab-label">微店头条</span>
                        </div>
                        <div className="mui-tab-item" onClick={()=>Bridge.callPhone(stats.Contact)}>
                            <span className="mui-icon mui-icon-phone" style={{fontSize:27}}></span>
                            <span className="mui-tab-label">联系我们</span>
                        </div>
                        <div onClick={()=>this.goOrderList()} className="mui-tab-item">
                            <span className="mui-icon mui-icon-extra mui-icon-extra-order"></span>
                            <span className="mui-tab-label">我的订单</span>
                        </div>
                    </nav>
                    {

                        !Storage.shortcutTip.getItem('visited') && (Platform.vendor=='safari' || Platform.vendor=='chrome'  || Platform.vendor=='wechat') ?
                            <ShortcutTip /> : null
                    }

            </div>
        )
    }
}