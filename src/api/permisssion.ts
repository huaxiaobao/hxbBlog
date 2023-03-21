import request from '@/utils/reequest';

//鉴权 
export const getEditorPermission = (params: any) => {
  return request({
    url: '/getPermission/editor',
    method: 'post',
    data: params
  })
}