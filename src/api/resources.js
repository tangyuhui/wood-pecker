export const serverURL = process.env.API_ROOT
export function merge (url) {
  return `${serverURL}/${url}`
 //  return `/peckerApi/${url}`
}
export default {
 GET_CODE_BY_TYPE:merge('code/{codeType}'), //根据码值类型获取业务码值集
 DB_CONNECT:merge('dbconnection'),           //数据库相关
 MONITOR:merge('monitor'), //监控策略
 MONITOR_CATEGORY:merge('monitorcategory') //监控分类

}