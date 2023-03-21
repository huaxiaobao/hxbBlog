// @ts-nocheck
/* 在定义接口的出入参的时候，需要注意  接口入参，出参返回的函数类型 */

import request from '@/utils/reequest';
//接口入参
interface IRequestParams {
  '/link/getLinkData': {
    keywords?: string
  }
}
//接口出参
interface IRequestReturnType {
  '/link/getLinkData': {
    code: number,
    Msg: string,
    data: any
  }
}

/* 函数 */

export const articleRequest = function <T extends keyof IRequestParams, U extends keyof IRequestReturnType>(api: T, params: IRequestParams[T]): Promise<IRequestReturnType[U]> {
  return request({
    url: api,
    method: 'post',
    data: params
  })
}

//查询友链
export const getLinkData = (params: any) => {
  return request({
    url: '/link/getLinkData',
    method: 'post',
    data: params
  })
}

//新增友链
export const linkAdd = (params: any) => {
  return request({
    url: '/link/linkAdd',
    method: 'post',
    data: params
  })
}
//修改友链 
export const linkEditor = (params: any) => {
  return request({
    url: '/link/linkEditor',
    method: 'post',
    data: params
  })
}

//删除友链
export const linkDelete = (params: any) => {
  return request({
    url: '/link/linkDelete',
    method: 'post',
    data: params
  })
}

//上传图片
export const pictrueSave = (params: any) => {
  return request({
    url: '/article/savaPictrue',
    method: 'post',
    data: params
  })
}

//删除图片

//上传文章文件
export const fileSava = (params: any) => {
  return request({
    url: '/article/savaFile',
    method: 'post',
    data: params
  })
}
//删除文章文件

//查询文章 getArticle
export const getArticle = (params: any) => {
  return request({
    url: '/article/getArticle',
    method: 'post',
    data: params
  })
}
//查询文章 通过id 
export const getArticleDataById = (params: any) => {
  return request({
    url: '/article/getArticleDataById',
    method: 'post',
    data: params
  })
}


//新增文章
export const articleAdd = (params: any) => {
  return request({
    url: '/article',
    method: 'post',
    data: params
  })
}

//修改文章
export const editorArticle = (params: any) => {
  return request({
    url: '/article/editorArticle',
    method: 'post',
    data: params
  })
}
//删除文章 
export const deleteArticle = (params: any) => {
  return request({
    url: '/article/deleteArticle',
    method: 'post',
    data: params
  })
}
//新增阅读量
export const addReadNum = (params: any) => {
  return request({
    url: '/article/addReadNum',
    method: 'post',
    data: params
  })
}




//热门文章查询
export const hotArticle = (params: any) => {
  return request({
    url: '/article/hotArticleQuery',
    method: 'post',
    data: params
  })
}

/* 文章最近更新查询  */
export const lastUpdateQuery = (params: any) => {
  return request({
    url: '/article/lastUpdateQuery',
    method: 'post',
    data: params
  })
}