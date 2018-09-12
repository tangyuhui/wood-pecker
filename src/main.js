import Vue from 'vue';
import App from './App.vue';
import store from '@/store'
// import 'static/rem'; 暂时不用rem
import { router } from './router';
import common from './common'
import globalMixin from './mixins/global'
import { Toast,Dialog } from 'vant';

import drag from '@/directive/drag'
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(common)
Vue.mixin(globalMixin)
Vue.directive('drag',drag)
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
}); 