/**
 * @author xuweichen@meitu.io
 * @date 3/9/17
 */
import Store from './Store';

const MKT_PARAMS = ['owner'];


function filterMktParams(source){
    var target = {}
    MKT_PARAMS.forEach((item)=>{
        typeof source[item]!=='undefined' && (target[item] = source[item]);
    });
    return target;
}

export default {
    init(location){
        this.store = new Store('MKT_STORE',{}, {lifetime: '2D'});
        this.store.mergeItems(filterMktParams(location.query));
    },
    merge(){

    },
    getItem(key){
        return this.store.getItem(key);
    },
    getData(){
        return this.store.getItem();
    },
    clear(){
        this.store.clear();
    }
}