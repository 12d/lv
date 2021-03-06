/**
 * @author xuweichen@meitu.io
 * @date 12/16/16
 */

export default class Util {
    static __guid = 0
    static guid(){
        return (+new Date)+(this.__guid++)
    }
    static runAt(){
        return typeof window==='undefined' ? 'server' : 'client'
    }
    static UA = (()=>{
        if(Util.runAt() === 'server'){
            return {}
        }else{
            let uaStr = navigator.userAgent.toLowerCase();
            return {
                wechat: /micromessenger/.test(uaStr)
            }
        }
    })()
}