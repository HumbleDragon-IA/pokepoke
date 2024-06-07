import { createApp } from 'vue'
import App from './App.vue'

import './bootstrap'
import router from './router'
import axiosInstance from './axios'

const app = createApp(App)
app.use(router)
app.config.globalProperties.$axios = axiosInstance
app.mount('#app')