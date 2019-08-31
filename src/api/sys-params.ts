import request from '@/utils/request'

// 参数列表
export const getSysParamsList = () =>
  request({
    url: '/sys-params/param-list',
    method: 'get'
  })

// 修改参数
export const doUpdateSysParam = (data: any) =>
  request({
    url: '/sys-params/upd-param',
    method: 'post',
    data
  })
