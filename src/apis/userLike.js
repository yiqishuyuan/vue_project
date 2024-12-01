import request from '@/utils/request'
export const userLike = (limit) => {
    return request('/goods/relevant', {
        params: {
            limit
        }
    })
}