import {
  UPDATE_PAGE_LOADING,
  UPDATE_DD_READY_STATUS,
  UPDATE_BOTTOM_BAR_SHOW
} from './mutation-types.js';

export default {
// 更新页面切换状态
  [UPDATE_PAGE_LOADING](state, flag) {
    console.log(flag)
    state.pageLoading = flag;
  },
  [UPDATE_DD_READY_STATUS](state, status) {
    state.dingReady = status;
  },
  [UPDATE_BOTTOM_BAR_SHOW](state, flag){
    state.bottomBarShow = flag
  }
};
