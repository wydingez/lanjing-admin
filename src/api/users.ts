import request from '@/utils/request'

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const getLoginCode = () => 
  request({
    url: '/mail/login-code/admin',
    method: 'get'
  })

export const login = (data: any) =>
  request({
    url: '/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/logout',
    method: 'post'
  })
