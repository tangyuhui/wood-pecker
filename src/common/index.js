import Moment from 'moment'
import _ from 'lodash'
const install = (Vue) => {
    if (install.installed) return
    // 前端数据总线
    Vue.prototype.$dd = window.dd
    // moment 
    Vue.prototype.$moment = Moment
    //lodash
    Vue.prototype.$_ = _
  }
  
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
  
  export default { install }