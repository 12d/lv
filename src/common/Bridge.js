/**
 * @author xuweichen@meitu.io
 * @date 12/19/16
 */

export default class Bridge{
    static callPhone(num){
        window.location.href = 'tel://' + num;
    }
}