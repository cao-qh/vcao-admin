// 进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'
import { message } from 'ant-design-vue'

// 第一步：利用axios对象的create方法，创建一个axios实例
const request = axios.create({
  // 基础路径 (基础路径上会携带/api)
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, //超时的时间的设置
})
// 第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  // 返回配置对象
  return config
})

// 第三步：响应拦截器
request.interceptors.response.use(
  (response) => {
    // 成功回调
    // 简化数据
    return response.data
  },
  (error) => {
    // 失败回调：处理http网络错误
    // 定义一个变量：存储网络错误信息
    let messageContent = ''
    const status = error.response.status
    switch (status) {
      case 401:
        messageContent = 'TOKEN过期'
        break
      case 403:
        messageContent = '无权访问'
        break
      case 404:
        messageContent = '请求资源不存在'
        break
      case 500:
        messageContent = '服务器内部错误'
        break
      default:
        messageContent = '网络出现问题'
        break
    }
    message.error(messageContent)
    return Promise.reject(error)
  },
)

// 对外暴漏
export default request
