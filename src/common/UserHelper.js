/**
 * @author xuweichen@meitu.io
 * @date 12/19/16
 */
import Store from './Store';
import Page from './Page';

var userStore = new Store('USER_STORE');
export default class UserHelper {
    static checkLogin(){

        var rs = !!userStore.getItem('auth');
        if(!rs){
             Page.forward('./login');
        }
        return rs
    }
    static logout(){
        // userStore.clear
    }
    static login(info){
        info.auth = atob(info.mobile);
        userStore.setItem(info)
    }
    static isLogin(){
        var user = userStore.getItem();

        return user && user.auth;
    }
    static getUser(){
        var user = userStore.getItem();
        return user && user.data;
    }
}