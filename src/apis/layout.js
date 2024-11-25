// 顶部导航条
import request from '@/utils/request'
export const getHeaderInfo = () => {
  return request.get('/home/category/head')
}
//  获取轮播图数据
export const getBannerInfo = (num) => {
  return request.get('/home/banner', {
    params: {
      distributionSite: num
    }
  })
}