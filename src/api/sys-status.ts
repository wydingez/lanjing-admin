import request from '@/utils/request'

// 系统状态
export const getSysBalance = () =>
  request({
    url: '/sys-status/balance',
    method: 'get'
  })

// 平台总利润
export const getSysTotalProfit = () =>
  request({
    url: '/sys-status/profit/total',
    method: 'get'
  })

// 阶段总利润
export const getSysPeriodProfit = (data: any) =>
  request({
    url: '/sys-status/profit/period',
    method: 'post',
    data
  })

// 平台利润列表
export const getSysProfitList = (data: any) =>
  request({
    url: '/sys-status/query/profit',
    method: 'post'
  })
