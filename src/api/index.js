import axios from '@/script/axiosHelp.js'
import  API_URL from './resources.js'
export default{
    /**根据码值类型获取业务码值集 */
    getCodeByType(codeType){
      let apiUrl = API_URL.GET_CODE_BY_TYPE
      apiUrl = apiUrl.replace('{codeType}',codeType)
      console.log(apiUrl)
      return axios.get(apiUrl)
    },
    /**获取所有的数据库连接 */
    getDbConnect(){
       return axios.get(API_URL.DB_CONNECT)
    },
    /**根据id获取数据库 */
    getDbById(id){
      if(!id){
        return Promise.reject('id不能为空')
      }
      return axios.get(`${API_URL.DB_CONNECT}/${id}`)
    },
    /**创建数据库连接 */
    createDbConnect(params){
       return axios.post( API_URL.DB_CONNECT,params)
    },
    /**修改数据库连接 */
    modifyDbConnect(id,params){
      return axios.put(`${API_URL.DB_CONNECT}/${id}`,params)
    },
    /**删除数据库连接 */
    deleteDbConnect(id){
      return axios.delete(`${API_URL.DB_CONNECT}/${id}`)
    },
    /**获取监控分类*/
    getMonitorCategory(){
      return axios.get(API_URL.MONITOR_CATEGORY)
    },
    /**新建监控分类 */
    createMonitorCategory(params){
      return axios.post(API_URL.MONITOR_CATEGORY,params)
    },
    /**修改监控分类 */
    modifyMonitorCategory(id,params){
      return axios.put(`${API_URL.MONITOR_CATEGORY}/${id}`,params)
    },
    /**删除监控分类 */
    deleteMonitorCategory(id){
      return axios.delete(`${API_URL.MONITOR_CATEGORY}/${id}`)
    },
    /**根据ID获取监控分类 */
    getMonitorCategoryById(id){
      if(!id){
        return Promise.reject('id不能为空')
      }
      return axios.get(`${API_URL.MONITOR_CATEGORY}/${id}`)
    },
    /**创建监控 */
    createMonitor(params){
      return axios.post(API_URL.MONITOR,params)
    }
}