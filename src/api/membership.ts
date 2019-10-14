import request from '@/utils/request'

export const getMemberDetail = (userId: string) =>
  request({
    url: `/membership/${userId}`,
    method: 'get'
  })

export const forbidLogin = (data: any) =>
  request({
    url: '/membership/forbid',
    method: 'post',
    data
  })
