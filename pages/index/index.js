//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('view.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    originData: [],
    showRuleMask: false
  },
  start() {
    this.setData({
      canIUse: wx.canIUse('view.open-type.getUserInfo')
    })
    console.log(this.data.canIUse)
    this.getUserData()
  },
  sRule() {
    this.setData({
      showRuleMask: !this.data.showRuleMask
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../start/start'
    })
  },
  onShow: function () {
    console.log('onShow')
  },
  onHide: function () {
    console.log('onHide')
  },
  onUnload: function () {
    console.log('onUnload')
  },
  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     console.log(res)
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       console.log(res)
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  gotophb () {
    wx.navigateTo({
      url: '../phb/phb'
    })
  },
  getUserData () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({
        url: '../hb/hb'
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.navigateTo({
          url: '../hb/hb'
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          if (!res) {
            wx.navigateTo({
              url: '../hb/hb'
            })
          }
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(app.globalData.userInfo)
    console.log(e, '------0----')
    if (!!e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.navigateTo({
        url: '../hb/hb'
      })
    } else {
      console.log(e, '拒绝时接受到的数据')
    }
  },
  onShareAppMessage: function (options) {
    console.log(options)
    return {
      from: 'menu',
      title: '11111111111111',
      path: '/pages/hb/hb?id=123',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
