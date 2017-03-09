/**
 * @author xuweichen@meitu.io
 * @date 12/16/16
 */
import Util from './Util';
var lifetimeUnit = {
    D: 8.64e7,
    H: 3.6e5,
    M: 6e4,
    S: 1e3
};
var REG_SPLIT_UNIT = /^(\d+)([DHMS])$/;
class Store {
    constructor(storeKey, initialData, conf){
        var lifetimeStr = conf && conf.lifetime || '30D';
        this._engine = conf && conf.engine || Store.engine;
        this._storeKey = storeKey;

        this._lifetime = this._calculateLifetime(lifetimeStr);
        this._store(initialData||{});
    }
    _calculateLifetime(lifetimeStr){
        var temp = REG_SPLIT_UNIT.exec(lifetimeStr);
        var amount, unit;
        if(!temp || temp.length!=3){
            amount = 30;
            unit = 86400
        }else{
            amount = parseInt(temp[1]);
            unit = lifetimeUnit[temp[2]];
        }
        return amount * unit + (+new Date())
    }
    _isExpired(data){
        if(data.lifetime < +new Date){
            this._engine.removeItem(this._storeKey);
            return true
        }else{
            return false
        }
    }
    _createStorage(data, lifetime){
        return {
            data,
            lifetime,
            create: +new Date,
            modified: +new Date
        }
    }
    _restore(){
        var rawData = this._engine.getItem(this._storeKey);

        if(rawData) {
            rawData = JSON.parse(rawData);
            if(!this._isExpired(rawData)){
                return rawData
            }else{
                return null
            }
        }
    }
    _merge(oldData, data){
        return {
            ...oldData,
            data: {
                ...oldData.data,
                ...data
            },
            modified: +new Date
        }
    }
    _store(data){
        var oldData = this._restore(),
            merged;

        if(oldData){
            merged = this._merge(oldData, data)     ;
        }else{
            merged = this._createStorage(data, this._lifetime);
        }

        this._engine.setItem(this._storeKey, JSON.stringify(merged));
    }
    setItem(key, value){
        var data = {}

        if(typeof value==='undefined' && typeof key==='object'){
            data = key
        }else{
            data[key]=value;
        }
        this._store(data);
    }
    getItem(key){

        var storage = this._restore(),
            data;

        if(typeof key==='undefined'){
            data = storage ? storage.data : null;
        }else{
            data = (storage && storage.data) ? storage.data[key] : null;
        }
        return data;
    }
    mergeItems(data){
        this._store(data);
    }
    clear(){
        // this._engine.remove
    }
    static engine = ((typeof localStorage!=='undefined') ? localStorage : {
        setItem(){

        },
        getItem(){
            return null
        }
    })
}

/**
 * @example
 */

// var store = new Store('KEY_STORE', {
//     data: 1212
// },{
//     lifetime: '2D'
// });


//
//
// class Store {
//     constructor(storeKey, initialData, conf){
//         this._engine = conf && conf.engine || Store.engine;
//         this._storeKey = storeKey;
//         this._save(initialData||{});
//     }
//     _createStorage(data, lifetime){
//         return {
//             data,
//             lifetime,
//             create: +new Date
//         }
//     }
//     getItem(itemkey){
//         var data = this._get();
//
//         return itemkey ? data[itemkey] : data;
//     }
//     clear(){
//         // this._engine.removeItem(this._storeKey);
//     }
//     setItem(itemkey, itemvalue){
//         var data = {}
//         if(typeof itemvalue==='undefined' && typeof itemkey==='object'){
//             data = itemkey
//         }else{
//             data[itemkey]=itemvalue
//         }
//         this._save(data)
//         return 1
//     }
//     _save(rawData){
//         var saved = this._get(),
//             storage;
//
//         if(!saved){
//             storage = this._createStorage(data, lifetime);
//         }
//         this._engine.setItem(this._storeKey, JSON.stringify(storage))
//     }
//     _get(){
//
//         return JSON.parse(this._engine.getItem(this._storeKey)||'{}');
//     }
//     static engine = ((typeof localStorage!=='undefined') ? localStorage : {
//         setItem(){
//
//         },
//         getItem(){
//
//         }
//     })
// }

export default Store;