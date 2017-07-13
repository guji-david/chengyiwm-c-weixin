/**
 * Created by lixianjun on 2017/3/2.
 */

  export const  userInfo = state => {
    return state;
  }

export const userEntryType = state=>{//用户入口类型
  return state.type;
}
export const isLogin = state=>{//当前是否处于登录
  return state.isLogin;
}
export const userId = state=>{//当前userId
  return state.userId;
}
export const token = state=>{//当前token
  return state.token;
}
export const footerShow = state=>{//当前footerShow
  return state.footerShow;
}
export const storageQuery = state=>{//搜索
  return state.query;
}
// export const userInfo = ({ state }) => state.data


