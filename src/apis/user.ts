import request from '@/util/request'

// 用户登录
export const LoginAPI = (data: API.LoginParams) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data
  }) as Promise<API.Result>
}

// 用户注册
export const RegisterAPI = (data: API.RegisterParams) => {
  return request({
    method: 'POST',
    url: '/user/register',
    data
  }) as Promise<API.Result>
}

//退出登录
export const logoutAPI = () => {
  return request({
    method: 'POST',
    url: '/user/logout'
  }) as Promise<API.Result>
}

//根据ID查询用户
export const getUserByIdAPI = (id: number) => {
  return request({
    method: 'GET',
    url: `/user/get/${id}`
  }) as Promise<API.Result>
}

//根据ID修改用户信息
export const updateUserByIdAPI = (data: API.UpdateUserParams) => {
  return request({
    method: 'POST',
    url: '/user/update/info',
    data
  }) as Promise<API.Result>
}

//获取当前登录用户
export const getLoginUserAPI = () => {
  return request({
    method: 'GET',
    url: '/user/get/loginUser'
  }) as Promise<API.Result>
}

//分页条件查询用户
export const listUsersByPageAPI = (data: API.listUsersParams) => {
  return request({
    method: 'GET',
    url: '/user/page',
    params: data
  }) as Promise<API.Result>
}

//删除用户
export const delUserByIdAPI = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/user/delete/${id}`
  }) as Promise<API.Result>
}