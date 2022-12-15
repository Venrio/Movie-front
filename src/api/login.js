import request from '@/utils/request'
// 登录
export const loginApi = (data) => {
  return request({
    url: 'http://localhost:9000/user/login',
    method: 'post',
    headers:{"content-type":"application/json"},
    data:data
  })
}

// 注册
export const registerApi = () => {
  return request({
    url: '/mock/register',
    method: 'get'
  })
}
