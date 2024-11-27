// 获取二级列表
import request from '@/utils/request'

export const getCategory = (id) => {
    return request.get('/category', {
        params: {
            id
        }
    })
}
//获取多余二级列表  --->全部分类
export const getCategoryOther  = (id) =>{
    return request.get('/category/sub/filter',{
        params:{
            id
        }
    })
}
export const getCategoryOtherSon  = (data) =>{
    return request.post('/category/goods/temporary',data)
}