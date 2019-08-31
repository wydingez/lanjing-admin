import request from '@/utils/request'

// 审核列表
export const getAuditList = (data: any) =>
  request({
    url: '/audit/realName-list',
    method: 'post',
    data
  })

// 审核拒绝
export const doAuditReject = (data: any) =>
  request({
    url: '/audit/realName/reject',
    method: 'post',
    data
  })

// 审核拒绝
export const doAuditApprove = (auditNo: string) =>
  request({
    url: `/audit/realName/approval/${auditNo}`,
    method: 'post'
  })

// 查看图片
export const doImagePreview = (fileName: string) =>
  request({
    url: `/image/real-name/${fileName}`,
    method: 'get'
  })

// 提现审核列表
export const getAuditWithdrawList = (data: any) =>
  request({
    url: '/audit/withdraw-list',
    method: 'post',
    data
  })

// 提现审核同意
export const doAuditWithdrawApprove = (streamNo: string) =>
  request({
    url: `/audit/withdraw/approval/${streamNo}`,
    method: 'post'
  })

// 提现审核拒绝
export const doAuditWithdrawReject = (data: any) =>
  request({
    url: '/audit/withdraw/reject',
    method: 'post',
    data
  })

// 充值审核列表
export const getAuditRechargeList = (data: any) =>
  request({
    url: '/audit/recharge-list',
    method: 'post',
    data
  })

// 充值审核同意
export const doAuditRechargeApprove = (streamNo: string) =>
  request({
    url: `/audit/recharge/approval/${streamNo}`,
    method: 'post'
  })

// 充值审核拒绝
export const doAuditRechargeReject = (data: any) =>
  request({
    url: '/audit/recharge/reject',
    method: 'post',
    data
  })
