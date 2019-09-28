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

export const deletArticle = (data: any) =>
  request({
    url: `/article/delete`,
    method: 'post',
    data
  })

export const detailArticle = (data: any) =>
  request({
    url: `/article/query`,
    method: 'post',
    data
  })

export const getArticleTypes = () =>
  request({
    url: '/article/query/category',
    method: 'get'
  })
