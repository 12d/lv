/**
 * @author xuweichen@meitu.io
 * @date 2017/7/10
 */
var isServerSide = typeof navigator=='undefined';
var ua = isServerSide ?  '' : navigator.userAgent ;

export default {
    get OS(){
        var platform = 'unknown';
        if((/ipad|phone/i).test(ua)){
            platform = 'ios';
        }else if((/android/i).test(ua)){
            platform = 'android';
        }
        return platform;
    },
    get vendor(){
        var vendor = 'unknown';
        if(isServerSide) return vendor;
        var isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;
        var isFirefox = ua.indexOf("Firefox") != -1;
        var isOpera = window.opr != undefined;
        var isChrome = ua.indexOf("Chrome") && window.chrome;
        var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        var isWechat = ua.indexOf("MicroMessenger")!=-1;

        if(isSafari){
            vendor='safari';
        }else if(isChrome) {
            vendor = 'chrome'
        }else if(isWechat){
            vendor = 'wechat';
        }else if(isFirefox){
            vendor='firefox'
        }else if(isIE){
            vendor='ie'
        }else if(isOpera){
            vendor='opera'
        }
        return vendor
    }
}