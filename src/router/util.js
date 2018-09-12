import {resetNavBar,setDingNavTitle} from '@/script/util';
import { Toast } from 'vant';
import store from '@/store'
import { UPDATE_PAGE_LOADING } from '@/store/mutation-types.js';
export function setRouterEvent(router) {
  router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
      setDingNavTitle(title)
      document.title = title;
    }
    next();
  });
  router.afterEach((to, from) => {
  });
}
export function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
        // A component to use while the component is loading.
    loading: require('@/view/system/TLoading.vue').default,
        // A fallback component in case the timeout is exceeded
        // when loading the component.
    error: require('@/view/system/Timeout.vue').default,
        // Delay before showing the loading component.
        // Default: 200 (milliseconds).
    delay: 1,
        // Time before giving up trying to load the component.
        // Default: Infinity (milliseconds).
    timeout: 10000
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
          // Transparently pass any props or children
          // to the view component.
      return h(AsyncHandler, data, children);
    }
  });
}
export function importView(path) {
  return function (resolve, reject) {
    store.commit(UPDATE_PAGE_LOADING,true)
    import('@/'+path).then(mod => {
      resolve(mod)
      store.commit(UPDATE_PAGE_LOADING,false)
    }).catch((err) => {
      alert(err)
      Toast('加载组件报错，请刷新重试');
      store.commit(UPDATE_PAGE_LOADING,false)
    })
  }
}
