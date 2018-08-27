const install = (Vue) => {
    console.log('window.dd',window.dd)
    if (install.installed) return
    // 前端数据总线
    Vue.prototype.$dd = window.dd
  }
  
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
  
  export default { install }