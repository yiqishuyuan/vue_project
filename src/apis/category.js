// 获取二级列表
import request from '@/utils/request'
export const getCategory = (id) => {
    return request.get('/category', {
        params: {
            id
        }
    })
}