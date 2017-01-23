/**
 * @author xuweichen@meitu.io
 * @date 12/13/16
 */
module.exports = {
    get Model() {
        return require('./Model').default
    },
    get Spy() {
        return require('./Spy').default
    },
    get Page() {
        return require('./Page').default
    },
    get HeaderView() {
        return require('./HeaderView').default
    },
    get Calendar() {
        return require('./Calendar').default
    },
    get DateUtil() {
        return require('./DateUtil').default
    },
    get ImageSlider(){
        return require('./ImageSlider').default
    },
    get HTMLText(){
        return require('./HTMLText').default
    },
    get NormalError(){
        return require('./error/NormalError').default
    },
    get Util(){
        return require('./Util').default
    },
    get Store(){
        return require('./Store').default
    },
    get Validator(){
        return require('./Validator').default
    },
    get Toast(){
        return require('./Toast').default
    },
    get Prompt(){
        return require('./Prompt').default
    },
    get Bridge(){
        return require('./Bridge').default
    },
    get UserHelper(){
        return require('./UserHelper').default
    },
    get App(){
        return require('./App').default
    }
}