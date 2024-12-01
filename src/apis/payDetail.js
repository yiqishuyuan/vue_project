// 确认支付接口
import request from '@/utils/request'
export const getPayAndGOOdsDetail = () => {
    return request.get('/member/order/pre')
}
// 提交订单
export const postConformOrder = (data) => {
    console.log('re', data.goods);

    return request.post('/member/order', data)
}
// 获取订单数据
export const getPayData = (id) => {
    return request.get(`/member/order/${id}`)
}