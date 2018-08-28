import store from '../store';
import { UPDATE_DD_READY_STATUS } from '@/store/mutation-types.js';
import {router} from '@/router';


function initNavBar() {
    dd.biz.navigation.setMenu({
      items: [
        {
          'id': '1', // 字符串
          'text': '返回首页'
        }
      ],
      onSuccess: function(data) {
        router.push('/frame/home');
      },
       onFail: function(err) {
            alert(err);
       }
    });
  }
export function dingEvent(fn, instance) {
  if (store.state.dingReady) {
    fn.call(instance);
  } else {
      //eslint-disable-next-line
    dd.ready(function() {
      store.commit(UPDATE_DD_READY_STATUS, true);
      fn.call(instance);
    });
  }
}

export function resetNavBar(){
    dingEvent(initNavBar)
}
export function setDingNavTitle(title){
    dingEvent(function(){
        dd.biz.navigation.setTitle({
            title : title,//控制标题文本，空字符串表示显示默认文本
            onSuccess : function(result) {
                /*结构
                {
                }*/
            },
            onFail : function(err) {}
        });
    },window)
}