/**
 * Created by lixianjun on 2017/3/2.
 */
import * as types from './types'

export default {
  //更新用户信息
  updateUserInfo:({commit},{userInfo})=> {
    commit(types.UPDATE_USER_INFO, userInfo)
    console.log('actions+更新用户信息' + userInfo);
  },
  //登录
   UserLogin:({commit},{userInfo})=> {
    commit(types.USER_LOGIN, userInfo)

  },
  //退出登录
  logout:({commit},{userInfo})=> {
    commit(types.EXTI_LOGIN, userInfo)
      console.log('退出登录更新用户信息'+JSON.stringify(userInfo))
  },
  // 登录，注册,忘记密码用户入口类型
    userEntryType:({commit},{type})=> {
   commit(types.USER_ENTRY_TYPE, type)
},
    /*底部条*/
    hideFooter:({commit})=>{
        commit(types.FOOTER_HIDE);
    },
    showFooter:({commit})=>{
        commit(types.FOOTER_SHOW)
    },
    storageQuery:({commit},{query})=>{
        commit(types.SEARCH_QUERY,query)
    },
}
