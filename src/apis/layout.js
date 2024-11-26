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
// 新鲜好物接口
export const getNewsFish = (num) =>{
  return request.get('/home/new',{
    params:{
      limit: num
    }
  })
}
// 人气推荐
export const getHotAPI = () => {
  return  request.get('home/hot')
}
//产品
export const getGoods = () =>{
  return request.get('/home/goods')
}