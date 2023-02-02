import {login as loginApi, auth as authApi} from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
import { ElMessage } from 'element-plus'

export default {
    namespaced: true,
    state: () => ({
        token: localStorage.getItem('token') || '',
        siderType: true,
        lang: localStorage.getItem('lang') || 'zh'
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem('token', token)
        },
        changeSiderType(state) {
            state.siderType = !state.siderType
        },
        changLang (state, lang) {
            state.lang = lang
        },
        setUsername(state, username) {
            state.username = username
            localStorage.setItem('username', username)
        },
        setImageURL(state, imageURL) {
            state.imageURL = imageURL
            localStorage.setItem('imageURL', imageURL)
        },
    },
    actions: {
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginApi(userInfo)
                    .then(res => {
                        if (res === null)
                        {
                            ElMessage.error("用户名或密码错误！")
                            resolve(-1)
                        }
                        commit('setToken', res.token)
                        commit('setUsername', res.username)
                        commit('setImageURL', res.img)
                        setTokenTime()
                        router.replace('/')
                        resolve()
                    })
                    .catch((err) => {
                        reject(err)

                    })
            })
        },
        // eslint-disable-next-line no-unused-vars
        authuser() {
            return new Promise((resolve, reject) => {
                const userInfo = {
                    username:localStorage.getItem('username'),
                    token:localStorage.getItem('token')
                }
                authApi(userInfo)
                    .then(res => {
                        if (res.issuper){
                            resolve()
                        }
                        else {
                            ElMessage.error(res.msg)
                            router.replace('/')
                        }
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        },
        // 退出
        logout({ commit }) {
            commit('setToken', '')
            localStorage.clear()
            router.replace('/login')
        }
    }
}
