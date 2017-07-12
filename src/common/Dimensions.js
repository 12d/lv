/**
 * @author xuweichen@meitu.io
 * @date 2017/7/12
 */
var bodyOffset = document.body.getBoundingClientRect();
let {width,height,left,top,bottom,right} = bodyOffset;
export default {
    get(dim){
        return {
            width,
            height
        }
    }
}