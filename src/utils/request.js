import axios from "axios";
import { useUserInfoStore } from "@/stores/index.js";
import router from "../router";


const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const instance = axios.create({
  baseURL: baseURL,
  timeout: 6000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const store = useUserInfoStore()
  const token = store.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 判断
  return response.data
  // return Promise.resolve(response.data)

}, function (error) {

  // eslint-disable-next-line no-undef
  ElMessage.error(error.response.data.message || '状态错误')
  if (error.response.status >= 400 && error.response.status <= 500) {
    const store = useUserInfoStore()
    store.removeInfo()
    // ElMessage.error('登录超时或错误')
    router.push('/login')
  }
  // 对响应错误
  return Promise.reject(error);
});

export default instance
