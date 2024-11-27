// 商品详情接口
import request from '@/utils/request'
export const  getProDetail = (id) =>{
    return request.get('/goods',{
        params:{
            id
        }
    })
}