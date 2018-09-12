
export * from './dingHelp'
 
export function  isPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}  
export function filterBackendData (response) {
    if (response && response.data) {
      if (response.data.success) {
        return Promise.resolve(response.data.data)
      } else {
        return Promise.reject(response.data.message)
      }
    } else {
      return Promise.reject('请求出错了，请联系后台人员')
    }
  }
  