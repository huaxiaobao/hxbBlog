

/* 登录注册状态 枚举*/
export enum loginStatus {
  Login,
  Register
}

/* 字体类型 */
export enum FontType {
  hxb = "hxb",
  cus = "cus",
  fzktk = "fzktk",
  none = ''
}

/* 用户信息 */

export interface IUserInfo {
  username: string,
  id: string,
  avatar: string,
  isLogin: boolean,//是否登录
  likes: number, //点赞
  attention: number //关注
}

