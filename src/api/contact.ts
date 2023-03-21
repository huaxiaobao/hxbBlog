/*
 * @Author: hxb 
 * @Date: 2022-10-10 15:07:15 
 * @Last Modified by: hxb
 * @Last Modified time: 2022-10-Th 04:51:14
 * 反馈
 */

import request from '@/utils/reequest';

/* 查询留言 */
export const contactQuery = (params: any) => {
  return request({
    url: '/contact/query',
    method: 'post',
    data: params
  })
}

/* 新增留言 */
export const contactAdd = (params: any) => {
  return request({
    url: '/contact/add',
    method: 'post',
    data: params
  })
}

/* 修改留言 */
export const contactEditor = (params: any) => {
  return request({
    url: '/contact/editor',
    method: 'post',
    data: params
  })
}

/* 删除留言 */
export const contactDelete = (params: any) => {
  return request({
    url: '/contact/delete',
    method: 'post',
    data: params
  })
}
