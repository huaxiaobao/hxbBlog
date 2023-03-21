import request from '@/utils/reequest';
//登录
/* 注册 */
export const regUser = (params: any) => {
  return request({
    url: '/reg',
    method: 'post',
    data: params
  })
}

/* 登录 */
export const login = (params: any) => {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}

//登录状态请求 
export const loginStatus = (params?: any) => {
  return request({
    url: '/login/loginStatus',
    method: 'post',
    data: params
  })
}

//修改用户名
export const updateName = (params: any) => {
  return request({
    url: '/updateInfo/updateUserName',
    method: 'post',
    data: params
  })
}

//修改密码
export const editPassword = (params: any) => {
  return request({
    url: '/updateInfo/editPass',
    method: 'post',
    data: params
  })
}

//修改头像 updateAvatar
export const updateAvatar = (params: any) => {
  return request({
    url: '/updateInfo/updateAvatar',
    method: 'post',
    data: params
  })
}


//退出登录 
export const loginOut = (params?: any) => {
  return request({
    url: '/login/loginOut',
    method: 'post',
    data: params
  })
}


//用户点赞 userLikeAttentUpdate
export const userLikeAttentChange = (params?: any) => {
  return request({
    url: '/login/userLikeAttentUpdate',
    method: 'post',
    data: params
  })
}
