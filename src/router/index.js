import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [

  {
    path: '/login',
    name: '登录',
    component: () => import('../views/login/demo')
  },
  {
    path: '/',
    name: '主页',
    component: () => import('../layout'),
    children:[
      {
        path: '/main',
        name: '主界面',
        component: () => import('../views/main')
      },
      {
        path: '/about',
        name: '关于',
        component: () => import('../views/about')
      },
      {
        path: '/userinfo',
        name: '用户个人信息',
        component: () => import('../views/userinfo')
      },
      {
        path: '/userlist',
        name: '用户列表',
        component: () => import('../views/userlist')
      },
    ]
  },
  {
    path: "/:pathMatch(.*)",
    name: "NotFound",
    component: () => import("@/components/404"),
  }
    ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

