/**
 * Created by lixianjun on 2017/3/2.
 */

import * as types from './types'
import * as  getters from './getters'

const state = {
  isLogin:false,
  userId:'15',
  token:'',
   type:0 ,  //2001：登录；2002：注册；2003:忘记密码,
  footerShow:true,
  query:'',
};

const mutations = {

  //登录
  [types.USER_LOGIN](state,data){
    state.isLogin = false;
    state.userId = data.userId;
    state.token = data.token;
    console.log('mutations+登录更新用户信息' + JSON.stringify(data));
  },
  //退出登录
  [types.EXTI_LOGIN](state,data){
    state.isLogin = true;
    state.userId = "";
    state.token = "";
    console.log('mutations+退出登录更新用户信息' + JSON.stringify(data));
  },

  //更新用户信息
  [types.UPDATE_USER_INFO](state,data){
    state.isLogin = true;
    state.userId = data.userId;
    state.token = data.token;
    console.log('mutations+更新用户信息' + JSON.stringify(data));
  },
  // 登录，注册,忘记密码用户入口类型
  [types.USER_ENTRY_TYPE](state,data){
  state.type = data;
},
  /*footer*/
  [types.FOOTER_HIDE](state){
    state.footerShow=false;
  },
  [types.FOOTER_SHOW](state){
    state.footerShow=true;
  },
  [types.SEARCH_QUERY](state,query){
    state.query=query;
  },

};
export default {
  state,
  mutations,
  getters

}
