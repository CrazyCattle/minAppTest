//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var self = this
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.showShareMenu({
      withShareTicket: true
    })

    // 登录
    new Promise((resolve, reject)=> {
      wx.login({
        success: res => {
          console.log(res)
          resolve(res)
        }
      })
    }).then((res) => {
      // 获取 openid 以及 session_key
      wx.request({
        url: `https://www.mohuso.com/port/wxAuthorization?code=${res.code}`,
        method: 'GET',
        success: (res) => {
          // console.log(res.data, res.data.error, res.data.result.openid)
          if (res.data.error == '0') {
            self.globalData.openid = res.data.result.openid
            console.log(self.globalData.openid)
          } 
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.nickname = res.userInfo.nickName
              this.globalData.avatar = res.userInfo.avatarUrl
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    nickname: '',
    openid: '',
    avatar: '',
    aboutUser: {}
  }
})