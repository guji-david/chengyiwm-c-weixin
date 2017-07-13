/**
 * Created by lixianjun on 2017/3/9.
 */
import * as API from '../api'
 import * as types from '../types'
import * as UTIlS from '../../common/utils'
const state = {
    messageList: [],
    reginChatlist:[],
    chatlist:[],
    rspLoginCode:1

};
const actions = {
    /***
     * 初始化登录信息
     * @param commit
     * @param data
     */
    loginList: ({commit}, {obj})=> {

        commit(types.LOGIN_CHAT_LIST, obj)

    },
    /***
     * 初始化注册信息
     * @param commit
     * @param data
     */
    reginList: ({commit}, {obj})=> {

        commit(types.REGIN_CHAT_LIST, obj)

    },
    /***
     * 初始聊理财信息
     * @param commit
     * @param data
     */
    chat: ({commit}, {obj})=> {

        commit(types.CHAT_LIST, obj)

    },

}

const mutations = {
    //登录
    [types.LOGIN_CHAT_LIST](state, data){
        var  list =  UTIlS.fetchLoginObj("loginList");
         list.push(data)
         UTIlS.saveLoginObj("loginList", list);

        state.messageList =list ;

        console.log('mutations+登录分配数据' + state.messageList);
    },
     //注册
    [types.REGIN_CHAT_LIST](state, data){

        var  list =  UTIlS.fetchLoginObj("reginList");
        list.push(data)

        UTIlS.saveLoginObj("reginList", list);

        state.reginChatlist =list ;

        console.log('mutations+注册分配数据' + state.reginChatlist);
    },
    //聊理财
    [types.CHAT_LIST](state, data){
        var  list =  UTIlS.fetchLoginObj("chatList");
        if (data.type!=4) {
            list.push(data)
        }
        UTIlS.saveLoginObj("chatList", list);
        state.chatlist= list ;
        console.log('mutations+聊理财分配数据' + state.chatlist);
    },


}

const getters = {
    // 登录
    loginList(state){
         console.log('loginList+得到数据' + JSON.stringify(state.messageList));
        return state.messageList;

    },
    // 注册
    regList(state){
        console.log('regList+得到数据' + JSON.stringify(state.reginChatlist));
        return state.reginChatlist;

    },
    // 聊理财
    chatlist(state){
        console.log('chatlist+得到数据' + JSON.stringify(state.chatlist));
        return state.chatlist;

    },
    // 聊理财
    rspLoginCode(state){
        console.log('rspLoginCode+得到数据' + JSON.stringify(state.rspLoginCode));
        return state.rspLoginCode;

    },


};

export default {
    state,
    actions,
    mutations,
    getters
}