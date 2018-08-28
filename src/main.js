import Vue from 'vue';
import App from './App.vue';
import store from '@/store'
// import 'static/rem'; 暂时不用rem
import { router } from './router';
import common from './common'
import globalMixin from './mixins/global'
import 'static/js/dragScript'
import { Dialog } from 'vant';
Vue.use(Dialog);
Vue.use(common)
Vue.mixin(globalMixin)
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
}); 