import axios from 'axios'
import { Notification } from 'element-plus'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res)

    // const headers = response.headers
    // if (headers['content-type'] === 'application/vnd.ms-excel') {
    //   return res
    // } else if (headers['content-type'] === 'text/comma-separated-values') {
    //   return res
    // }
    // if the custom code is not 0, it is judged as an error.
    // if (res.Code === 200 || res.Code === 201 || res.success === 'True') {
    //   return res
    // } else if (res.Code === 205) { // 参数校验错误
    //   Notification.warning({
    //     title: '提示',
    //     position: 'bottom-right',
    //     message: res.Msg || '请完善信息',
    //     duration: 3 * 1000
    //   })
    //   return Promise.reject(new Error(res.Msg || 'Error'))
    // } else if (res.Code === 206) { // 登录错误
    //   Notification.warning({
    //     title: '提示',
    //     position: 'bottom-right',
    //     message: res.Msg || '登录失败！',
    //     duration: 3 * 1000
    //   })
    //   return Promise.reject(new Error(res.Msg || 'Error'))
    // }
    return res
  }
  },
  error => {
    console.log('err' + error) // for debug
    Notification.error({
      title: '提示',
      position: 'bottom-right',
      message: error.message,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
