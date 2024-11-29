import request from '@/utils/request'
//用户名和密码登录
export const loginInfoApi = (data) =>{
  return request.post('/login',data)
}

