/**
 * @author xuweichen@meitu.io
 * @date 12/19/16
 */
const RE_MOBILE = /^1[34578]\d{9}$/;
export default {
    isMobile(number){
        return RE_MOBILE.test(number);
    },
    isNotEmpty(str){
        return str.length>0
    }
}