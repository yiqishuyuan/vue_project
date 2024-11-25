// 顶部导航条
import request from '@/utils/request'
export const getHeaderInfo = () =>{
  return request.get('/home/category/head')
}