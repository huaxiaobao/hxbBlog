import request from '@/utils/reequest'
//
/* 查询留言 */
export const siteQuery = (params: any) => {
  return request({
    url: '/site/querySiteInfo',
    method: 'post',
    data: params
  })
}