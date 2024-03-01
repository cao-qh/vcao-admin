// 进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'
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
