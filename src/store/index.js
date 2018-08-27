import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';
/** 用于在浏览器刷新后 保存 vuex 状态的小插件 */
import vuexAlong from 'vuex-along';
Vue.use(Vuex);

const state = {
  pageLoading: false
};

vuexAlong.onlySession(true);
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [vuexAlong]
});
