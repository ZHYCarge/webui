import router from './index'
import store from '@/store'
import {ElMessage} from "element-plus";
const whiteList = ['/login','/','/main','/about','/404']
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      ElMessage.error("请先登录后在进行访问！")
      next('/login')
    }
  }
})
