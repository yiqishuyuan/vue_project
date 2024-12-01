import request from '@/utils/request'
// 用户的信息
// export const getUserOrder = (data) => {
//     console.log('request', data);
//     return request.get('/member/order', {
//         params: {
//             orderState: data.orderState,
//             page: data.page,
//             pageSize: data.pageSize
//         }
//     })
// }
export const getUserOrder = (params) => {
    return request.get('/member/order', {
        params
    })
}
