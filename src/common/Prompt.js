/**
 * @author xuweichen@meitu.io
 * @date 12/19/16
 * @depends
 */
export default class Prompt {
    static show({message, placeholder, title, yesLabel, noLabel, onYes, onNo}){
        mui.prompt(message, placeholder, title, [yesLabel, noLabel], function(e) {
            if (e.index == 0) {
                onYes && onYes(e)
            } else {
                onNo && onNo(e)
            }
        })
    }
}