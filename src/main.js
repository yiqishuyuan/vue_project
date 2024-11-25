import { createApp } from 'vue'
import '@/styles/common.scss'
import App from './App.vue'
import router from './router'
import pinia from './stores'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
