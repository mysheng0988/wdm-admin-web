import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: "localhost:8080", // api的base_url
  timeout: 15000 // 请求超时时间
})
service.defaults.withCredentials=true
service.defaults.crossDomain=true
// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['access-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // config.headers['service-id']="2000"
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if(res.retcode||res.code==804||res.code=="200"){
      return response.data
    }else if(res.code=="601"){
      Message({
        message:"登录信息已过期",
        type: 'error',
        duration: 3 * 1000
      })
      setTimeout(function(){
        window.location="/"
      },500)
    }else{
      let message=res.message?res.message:res.msg;
      Message({
        message:message,
        type: 'error',
        duration: 3 * 1000
      })

      return Promise.reject('error')
    }
  },
  err => {
    console.log('err' + err)// for debug
    Message({
      message: "服务器连接失败",
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(err)
  }
)

export default service
