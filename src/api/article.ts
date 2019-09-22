import request from '@/utils/request'

export const addArticle = (data: any) =>
  request({
    url: '/article/add',
    method: 'post',
    data
  })

export const editArticle = (data: any) =>
  request({
    url: '/article/update',
    method: 'post',
    data
  })

export const deletArticle = (articleKey: string) =>
  request({
    url: `/article/delete/${articleKey}`,
    method: 'post'
  })

export const detailArticle = (articleKey: string) =>
  request({
    url: `/article/query/${articleKey}`,
    method: 'get'
  })
