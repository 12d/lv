/**
 * @author xuweichen@meitu.io
 * @date 12/13/16
 */
/**
 * Common tool to send data request
 * @module Model
 *
 */

// import Config from '../config/dev';
import Config from '../Config';
import Spy from './Spy';
import Store from './Store';
import UserHelper from './UserHelper';
var fetch = require('node-fetch');
let userData = UserHelper.getUser();
let secureCodeStore = new Store('SECURE_CODE');
class Model {
    constructor(options) {
        this.useSecureCode = options.useSecureCode === true;
        /**
         * 是否请求中带auth, 默认true
         */
        this.useAuth = options.useAuth === false;
            // super();
            /**
             * 数据请求url, 必填
             * @name url
             * @type {string}
             */
        this.url = options.url;

        /**
         * 请求参数,必选
         * @name param
         * @type {object}
         */
        this.param = null;

        /**
         * 数据返回时的自定义格式化函数
         * @method dataformat
         * @type {function}
         */
        this.dataformat = null;

        /**
         * 通讯协议,http/https,默认为``location.protocol``
         * @name protocol
         * @type {string}
         */
        this.protocol = 'http';
        /**
         * 提交数据格式 json/form/jsonp, 默认json
         * @name contentType
         * @type {string}
         */
        this.contentType = Model.contentTypes.JSON;
        /**
         * 数据提交方式,post/get， 默认post
         * @name method
         * @type {string}
         */
        this.method = 'POST';


        /**
         * 超时时间
         * @name timeout
         * @type {number}
         */
        this.timeout = 30000;

        this.useAuth && UserHelper.checkLogin();
    }

    absUrl(relativeUrl) {
        return this.isAbsUrl(relativeUrl) ? relativeUrl : Config.baseModelUrl + relativeUrl
    }

    /**
     * 获取model的查询参数
     * @returns {json|Store} param  查询参数
     */
    get params() {
        return this.param
    }

    get result() {

    }

    execute(params) {
        // debugger
        params = params || {};

        // debugger
        if(this.useAuth && (!userData || !userData.auth)){
            Spy.log(`${this.url} is need login`);
            return new Promise((resolve, reject)=>{
                reject(`${this.url} is need login`)
            });
        }
        if(this.useSecureCode){
            params.secureCode = secureCodeStore.getItem('secureCode');
        }
        if(this.useAuth){
            params.auth = userData.auth;
        }
        // debugger;
        // params.auth = userData.auth;
        let format = this.contentType == Model.contentTypes.JSON ? 'json' : 'text';
        
        params = typeof params === 'object' ? JSON.stringify(params) : params;
        return fetch(this.absUrl(this.url), {
            method: this.method,
            headers: {
                'Accept': this.contentType,
                'Content-Type': this.contentType,
            },
            body: params
        }).then((response) => response[format]()).then((formattedData)=> {
            // debugger
            console.log('formattedData',formattedData)
            return new Promise((resolve, reject)=> {
                let dataType = typeof formattedData;
                if ((dataType === 'object' && formattedData.Code==200 && formattedData.Data.Success) || dataType === 'string') {
                    resolve(formattedData);
                } else {
                    let msg = formattedData || {message:'data parse error'}
                    Spy.log(msg)
                    reject(msg);
                }
            });
        }).catch((ex)=> {
            return new Promise((resolve, reject)=> {
                Spy.log(params);
                Spy.log(ex);
                reject(ex);
            })
        })
    }

    isAbsUrl(url) {
        return url && url.indexOf('://') > -1
    }

    static post(url, params, options) {
        // debugger
        // debugger
        console.log('request params', params)
        return this.create({
            ...options,
            method: Model.POST,
            url: url
        }).execute(params);
    }

    static get(url, params, useAuth) {
        return this.create({
            ...options,
            useAuth,
            method: Model.GET,
            url: url
        }).execute(params);
    }

    static create(options) {
        return new Model(options)
    }

    static contentTypes = {
        JSON: 'application/json'
    }
    static POST = 'POST';
    static GET = 'GET'
}


export default Model