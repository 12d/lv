/**
 * @author xuweichen@meitu.io
 * @date 2017/8/17
 */
import React, {Component} from 'react';
import {Page, Model,Toast} from '../common/lv';
export default class Marketing extends Page {
    headerview = {
        title: ' '
    }
    render(){
        let data = this.state.data;
        data = data && data.Data;
        data = data && data.Infos || {};
        return this.create(
            <section>
                <img src={data.PicUrl} style={{width:'100%'}}/>
                <div dangerouslySetInnerHTML={{__html: data.Content}} style={{position:'relative',padding:10}}></div>
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
            let sharedData = rs.Data.Infos;
            let shareTitle = sharedData.ShareTitle;
            this.wechatReady(()=> {
                this.wechat.share({
                    title: sharedData.ShareTitle, // 分享标题
                    desc: sharedData.Title, // 分享描述
                    link: location.href, // 分享链接
                    imgUrl: sharedData.PicUrl, // 分享图标
                });
                document.title = shareTitle;
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
        return Model.post('/sharedline/getwdpost',{
            postID: params.id
        },{useAuth:false})
    }

}