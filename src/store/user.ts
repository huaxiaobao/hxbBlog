import { defineStore } from 'pinia'
import { ElNotification } from 'element-plus'
import { login, loginOut } from '@/api/login'
import { getEditorPermission } from '@/api/permisssion'
import { IUserInfo } from '@/type/index'

export const userInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      username: '',
      id: '',
      avatar: '',
      isLogin: false,//是否登录
      likes: 0, //点赞
      attention: 0, //关注
    }
  },
  getters: {},
  actions: {
    /* 用户登录 */
    loginUser(userInfo: object) {
      return new Promise((reslove, reject) => {
        login(userInfo).then((res: any) => {
          if (res.code === 201) {
            //账户密码不正确
            ElNotification({
              title: '提示',
              type: 'warning',
              message: res.Msg,
              position: 'bottom-right'
            })
            reslove(res)
          } else if (res.code === 405) {
            reslove(res)
          } else {
            //登录成功
            console.log(res.data)
            this.SET_USERINFO(res.data)
            this.SET_LOCALSTORE(res.data)
            reslove(res)
          }
        }).catch((res: any) => {
          reject(res)
        })
      })
    },

    //保存用户信息
    SET_USERINFO(userInfo: IUserInfo) {
      this.username = userInfo.username
      this.id = userInfo.id
      this.avatar = userInfo.avatar
      this.likes = userInfo.likes
      this.attention = userInfo.attention
    },

    //清除
    REMOVE_USERINFO() {
      this.username = ''
      this.id = ''
      this.avatar = ''
      this.likes = 0
      this.attention = 0
    },

    /* 本地存储 保存用户登录信息 */
    SET_LOCALSTORE(userInfo: IUserInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },

    //退出登录
    loginDispatch() {
      return new Promise((reslove, reject) => {
        loginOut()
          .then((res: any) => {
            if (res.code === 803) {
              this.REMOVE_USERINFO()
              reslove(res.code)
            }
          })
          .catch(() => {
            reject()
          })
      })

    },

    //请求权限
    getPermission() {
      return new Promise((resolve, rejects) => {
        getEditorPermission({})
          .then((res: any) => {
            console.log(res.code)
            resolve(res.code === 200 ? true : false)
          })
          .catch((res: any) => {
            rejects(false)
          })
      })
    }

  }
})