import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // 例如添加token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.log('发送请求:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error: AxiosError) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status } = response

    console.log('收到响应:', status, response.config.url)

    // 根据状态码处理响应
    if (status === 200) {
      // 成功响应
      return data
    } else {
      // 其他状态码处理
      console.error(`请求失败: ${status}`)
      return Promise.reject(new Error(`请求失败: ${status}`))
    }
  },
  (error: AxiosError) => {
    console.error('响应错误:', error)

    // 处理HTTP错误状态码
    const status = error.response?.status
    const messageMap: Record<number, string> = {
      400: '请求参数错误',
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: '请求资源不存在',
      500: '服务器内部错误',
    }

    const errorMessage = status ? messageMap[status] || `请求失败: ${status}` : error.message
    console.error(errorMessage)

    return Promise.reject(error)
  }
)

// 导出封装的请求方法
export const get = <T = any>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  return request.get(url, { params, ...config }).then((response) => response.data)
}

export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request.post(url, data, config).then((response) => response.data)
}

export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return request.put(url, data, config).then((response) => response.data)
}

export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return request.delete(url, config).then((response) => response.data)
}

// 导出request实例
export default request
