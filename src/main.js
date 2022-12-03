import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/router/permission'
// import axios from 'axios'
// import VueAxios from 'vue-axios'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// createApp(App)
app
    .use(router)
    .use(store)
    .use(ElementPlus)
    // .use(axios,VueAxios)
    .mount('#app')
