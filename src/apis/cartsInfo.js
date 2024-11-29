import request from '@/utils/request'
// 获取登录时的商城列表
export const getCartsList = () => {
    return request.get('/member/cart')
}
// 合并购物车 
export const mergeCarts = (data) => {
    return request.post('/member/cart/merge', data)
}
//  登录时加入购物车
export const postCart = (data) => {
    return request.post('/member/cart', {
        skuId: data.skuId,
        count: data.count
    })
}
// 删除商品
export const delCart = (arr) => {
    // console.log(arr);
    return request.delete('/member/cart',{
        data:{
            ids:arr
        }
    })
}