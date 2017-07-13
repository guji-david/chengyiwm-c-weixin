/**
 * Created by lixianjun on 2017/3/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import chatList from './modules/loginStore'
import mutations from './mutations'
import actions from './actions'
 import * as getters from './getters'
export default new Vuex.Store({
    actions,
  modules: {
      chatList,
      mutations,
  },
     getters
});
