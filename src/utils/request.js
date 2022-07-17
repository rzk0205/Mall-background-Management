import axios from 'axios'
// import store from '@/store'
import { ElMessage } from 'element-plus'

const exceptionMessage = {
  1: '系统异常',
  400: '登陆失败'
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    // token
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (res) => {
    // console.log(res)
    // return res

    console.log(res) // 后端响应的数据
    const { status, msg } = res

    // TODO 全局相应处理
    if (status === 200) {
      return res.data
    } else {
      _showErrorMessage(msg)
      return Promise.reject(new Error(msg))
    }
  },
  (error) => {
    console.log(error)
    // 响应失败进行信息处理
    _showErrorMessage(error.msg)
    return Promise.reject(error)
  }
)

// 错误消息提示
const _showErrorMessage = (code, msg) => {
  const message = exceptionMessage[code] || msg || '未知错误'
  ElMessage({ message, type: 'error' })
}

// 统一了传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

export default request
