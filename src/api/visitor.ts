import request from '@/utils/reequest';

//查询访客信息
export const getVisitorquery = (params: any) => {
  return request({
    url: '/visitor/query',
    method: 'post',
    data: params
  })
}
