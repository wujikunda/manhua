import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { Message } from 'element-ui'
import store from '@/store'
import md5 from 'js-md5'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils'
// create an axios instance
const service = axios.create({
  baseURL: '/admin', // http://47.111.176.39:8100/api url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
  // headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    if (config.params) {
      config.params = Object.assign({}, config.params)
      config.params.timestamp = parseTime(new Date())
      config.params.sign = getSign(config.params)
    }
    if (config.data) {
      config.data = Object.assign({}, config.data)
      config.data.timestamp = parseTime(new Date())
      config.data.sign = getSign(config.data)
      // config.data = qs.stringify(config.data)
    }
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

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        // MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //   confirmButtonText: 'Re-Login',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(res.message || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export function getSign(obj) {
  const arr = Object.keys(obj)
  arr.sort()
  let stringA = ''
  arr.forEach(function(item, index) {
    if (!obj[item]) {
      return
    }
    if (Array.prototype.isPrototypeOf(obj[item]) && obj[item].length === 0) {
      return
    }
    if (Object.prototype.isPrototypeOf(obj[item]) && Object.keys(obj[item]).length === 0) {
      return
    }
    stringA += item + '=' + obj[item]
    if (index !== arr.length - 1) {
      stringA += '&'
    }
  })
  var url = stringA + `&key=njcRD9o9nEUHpXJA`
  // console.log('url', url)
  return md5(url).toLocaleUpperCase()
}
export default service
