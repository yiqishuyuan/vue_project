import { createApp } from 'vue'
import '@/styles/common.scss'
import App from './App.vue'
import router from './router'
import pinia from './stores'
//懒加载
import { lazyPlugin } from './directives/lazy'
import { components } from './components/index'
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(lazyPlugin)
//全局注册的组件
app.use(components)
app.mount('#app')
