import request from '@/utils/reequest';
//留言
/* 新增留言 */
export const remarkAdd = params => {
  return request({
    url: '/remark',
    method: 'post',
    data: params
  })
}