import * as types from './mutation-types.js';

export default {
// 更新页面切换状态
  [types.UPDATE_PAGE_LOADING](state, flag) {
    state.pageLoading = flag;
  },
  [types.UPDATE_DD_READY_STATUS](state, status) {
    state.dingReady = status;
  },
  [types.UPDATE_BOTTOM_BAR_SHOW](state, flag){
    state.bottomBarShow = flag
  },
  [types.UPDATE_DRAG_STATUS](state, flag){
    state.isDraging = flag
  }
};
