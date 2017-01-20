/**
 * @author xuweichen@meitu.io
 * @date 12/13/16
 */
/**
 * Used for monitoring
 * @module Spy
 */
import Config from '../Config';

let sendLog = (typeof navigator!='undefined' && navigator.sendBeacon) ? function(url, data){
    var formData = new FormData();
    formData.append('data', data);
    return navigator.sendBeacon(url, formData);
} : function(url, data){
    var sender = new Image();
    console.log(url+'?data='+data);
    sender.src = url+'?data='+data;
    return !!sender
}

export default {
    log: console.log,
    /**
     * @desc 上报数据
     * @param {string} url 接受参数的url
     * @param {object} data 需要记录的数据
     * @returns {boolean} 队列成功返回true, 否则false
     */
    send: function(data){
        data = typeof data==='object' ? JSON.stringify(data) : data;
        console.log(data);
        return sendLog(Config.baseModelUrl+Config.logServer, data);
    }
}