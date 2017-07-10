/**
 * @author xuweichen@meitu.io
 * @date 2017/7/10
 */
import {Store} from './common/lv';

var shortcutTipStorage = new Store('SHORTCUT_TIP_STORAGE',{},{
    lifetime: '5D'
})

export default {
    get shortcutTip(){
        return shortcutTipStorage
    }
}