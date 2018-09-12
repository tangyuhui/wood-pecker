import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.timeout = 20000
axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            return Promise.reject('登录超时，请重新登录!')
          case 403:
            return Promise.reject('禁止访问!')
          case 404:
          return Promise.reject('接口访问路径出错!')
        }
      }
      return Promise.reject('服务器出错，请重试')
    }
)
export default axios