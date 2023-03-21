import request from '@/utils/reequest';
//留言
/* 新增留言 */
export const remarkAdd = (params: any) => {
  return request({
    url: '/remark',
    method: 'post',
    data: params
  })
}

//查询留言  
export const getRemarkData = (params: any) => {
  return request({
    url: '/remark/getRemarkData',
    method: 'post',
    data: params
  })
}

//新增子留言
export const remarkAddSon = (params: any) => {
  return request({
    url: '/remark/remarkAddSon',
    method: 'post',
    data: params
  })
}

//留言点赞
export const remarkLikes = (params: any) => {
  return request({
    url: '/remark/likes',
    method: 'post',
    data: params
  })
}
