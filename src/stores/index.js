// pinia
import { createPinia } from 'pinia';
// 持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export * from '@/stores/modules/bannerStore'
export * from '@/stores/modules/userInfo.js'
export * from './modules/cartStore'
export default pinia