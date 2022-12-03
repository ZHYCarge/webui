import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import {diffTokenTime} from "@/utils/auth";

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
          ElMessage.error('tocken失效了，请重新登录')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
    (response) => {
        const meta = response.data

        if (response.status === 200 && response.data.ret === 200) {
            return meta.data
        } else {
            ElMessage.error(meta.msg)
            // return Promise.reject(new Error(meta.msg))
        }})
export default service
