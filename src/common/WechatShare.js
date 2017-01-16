/**
 * @author xuweichen@meitu.io
 * @date 1/11/17
 * var shareWidget = Share.getInstance();
 * shareWidget.ready(()=>{
 *      shareWidget.share(data)
 * })
 */
//import sdk from '../libs/jweixin';
//console.log(sdk)
import Model from './Model';
import Toast from './Toast';
const NOOP=()=>{}
let singleton;
var apis = {
    'timeline': 'onMenuShareTimeline',
    'session': 'onMenuShareAppMessage',
    'qq': 'onMenuShareQQ',
    'weibo': 'onMenuShareWeibo',
    'qzone': 'onMenuShareQZone'
}
export default class Share {
    constructor(options){
        this.options = {
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx407f4a1a28d9c33d', // 必填，公众号的唯一标识
            timestamp: '', // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '',// 必填，签名，见附录1
            jsApiList: [apis.timeline,apis.session,apis.qq,apis.weibo,apis.qzone] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        }

        this._listeners = {}
    }
    ready(callback){
        // var sdkPromise = new Promise((resolve, reject)=>{
        //     wx.ready((rs)=>{
        //         resolve(rs)
        //     })
        //     wx.error((err)=>{
        //         reject(err)
        //     })
        // })
        Promise.all([this.getTicket()]).then(values=>{
            var config = values[0].Data.Infos;
            this.sdk = wx;
            this.config(config);
            wx.ready(()=>{
                callback && callback();
            })
        })
    }
    getTicket(){
        return Model.get('/sharedline/GetTicket');
    }
    config(options){
        this.options = Object.assign(this.options, options);
        this.sdk.config(this.options);
        console.log('config',this.options)
    }
    /**
     *
     * @param shareData 分享数据
     * {
     *      timeline: {
     *          title: '', //分享标题
     *          desc: '', //分享描述
     *          link:'', //分享链接
     *          imgUrl: '', //分享图标
     *          type: '', //分享类型,music, video, link
     *          dataUrl: '',//如果type是music或video，则要提供数据链接，默认为空
     *          success: fn,// 用户确认分享后执行的回调函数
     *          cancel: fn// 用户取消分享后执行的回调函数
     *      },
     *      session: {
     *
     *      },
     *      qq: {
     *
     *      },
     *      qzone: {
     *
     *      },
     *      default: {
     *
     *      }
     * }
     */
    share(shareData){
        wx.ready(()=>{
            var config,
                self = this,
                timelineConfig,
                sessionConfig,
                qqConfig,
                qzoneConfig,
                defaultConfig;

            for(let type in apis){
                config = shareData[type];
                if(!config) {
                    config = shareData['default'] || shareData;
                    //拷贝一个对象
                    config = Object.assign({},config);
                    //如果是朋友圈,默认标题是title+desc
                    if(type==='timeline'){
                        config.title = '美途线路推荐:'+config.desc;
                    }
                    if(!config.imgUrl) config.imgUrl=require("../assets/green-logo.png")
                }
                //add events
                ['success','cancel'].forEach((event)=>{
                    config[event] = function(){
                        let handler = self._listeners[type+'_'+event] || (()=>{Toast.show(event=='success'?'分享成功':'您取消了分享')});
                        handler.apply(self, arguments);
                    }
                })
                this.sdk[apis[type]](config);
            }
        });

        return this;
    }
    on(type, success, cancel){
        this._listeners[type+'_success'] = success;
        this._listeners[type+'_fail'] = fail;
        return this;
    }
    static getInstance(){
        return singleton || (singleton = new Share())
    }
}

