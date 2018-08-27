import {
  UPDATE_PAGE_LOADING,
  UPDATE_DD_READY_STATUS
} from './mutation-types.js';

export default {
// 更新页面切换状态
  [UPDATE_PAGE_LOADING](state, flag) {
    console.log(flag)
    state.pageLoading = flag;
  },
  [UPDATE_DD_READY_STATUS](state, status) {
    state.dingReady = status;
  }
};
