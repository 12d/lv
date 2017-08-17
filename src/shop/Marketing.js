/**
 * @author xuweichen@meitu.io
 * @date 2017/8/17
 */
import React, {Component} from 'react';
import {Page, Model,Toast} from '../common/lv';
export default class Marketing extends Page {
    headerview = null
    render(){
        let data = this.state.data.Data.Infos;
        return this.create(
            <section style={{marginTop:-44}}>
                <img src={data.BannerUrl} style={{width:'100%'}}/>
                <div dangerouslySetInnerHTML={{__html: data.html}} style={{position:'relative'}}></div>
            </section>
        )
    }
    constructor(){
        super()
    }
    componentWillMount(){
        this.state = {
            data: this.getInitialData()
        }
    }

    componentDidMount(){
        Marketing.prefetch(this.props.params).then(rs=>{
            this.setState({
               data: rs
            });
            let shopTitle = rs.Data.Infos.Title+"微门店店铺首页";
            this.wechatReady(()=> {
                this.wechat.share({
                    title: this.getParams('sharetitle') || '我在美途旅旅发现了一家很赞的旅行社微门店 - '+rs.Data.Infos.Title, // 分享标题
                    desc: shopTitle, // 分享描述
                    link: location.href, // 分享链接
                    imgUrl: rs.Data.Infos.LogoUrl, // 分享图标
                });
                this.wechat.on('all', this.sharedHandler.bind(this))
            });
        })
    }
    sharedHandler(){
        // Toast.show('分享成功');
        // Spy.send({
        //     storeid: this.getParams('storeid'),
        //     token: btoa((+new Date)+this.getParams('owner')),
        //     owner: parseInt(this.getParams('owner')),
        //     pids: [this.getParams('id')]
        // })
    }
    static prefetch(params){
        return Model.post('/sharedline/getweistore',{
            id: params.id
        },{useAuth:false})
    }

}