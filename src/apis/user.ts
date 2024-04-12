import request from '@/util/request'

// 用户登录
export const LoginAPI = (data: API.LoginParams) => {
  return request({
    method: 'POST',
    url: '/login',
    data
  }) as Promise<API.Result>
}

// 用户注册
export const RegisterAPI = (data: API.RegisterParams) => {
  return request({
    method: 'POST',
    url: '/register',
    data
  }) as Promise<API.Result>
}