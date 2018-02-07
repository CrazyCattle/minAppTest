//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    originData: [],
    showRuleMask: false,
    from_id: ''
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
  viewTheCouplet (e) {
    wx.navigateTo({
      url: `../choujiang/cj?openid=1111111112121`
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
  onLoad: function (options) {
    const self = this
    if (!!options.id) {
      console.log('我从分享那里来....---------' + options.id)
      this.setData({
        from_id: options.id
      })
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
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
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          app.globalData.nickname = res.userInfo.nickName
          app.globalData.avatar = res.userInfo.avatarUrl
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          
          new Promise((resolve, reject) => {
            wx.request({
              url: `https://www.mohuso.com/port/judgeUser?wxtoken=${app.globalData.openid}`,
              method: 'GET',
              success: function(res){
                console.log(res)
                resolve(res)
              },
              fail: function(err) {
                reject(err)
              },
              complete: function(res) {
                resolve(res)
              }
            })
          }).then((res) => {
            console.log(`https://www.mohuso.com/port/yearAddUser?wxtoken=${app.globalData.openid}&nickname=${app.globalData.nickname}&avatar=${app.globalData.avatar}`+`${!!self.data.from_id?'&from_id='+self.data.from_id:''}`)
            if (res.data.error == '1') {
              wx.request({
                url: `https://www.mohuso.com/port/yearAddUser?wxtoken=${app.globalData.openid}&nickname=${app.globalData.nickname}&avatar=${app.globalData.avatar}`+`${!!self.data.from_id?'&from_id='+self.data.from_id:''}`,
                method: 'GET',
                success: function(res){
                  console.log(res)
                },
                fail: function() {
                  // fail
                },
                complete: function() {
                  // complete
                }
              })
            }
          })
        }
      })
    }
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
        url: '../dati/dati'
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
          url: '../dati/dati'
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
              url: '../dati/dati'
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
        url: '../dati/dati'
      })
    } else {
      console.log(e, '拒绝时接受到的数据')
    }
  },
  onShareAppMessage: function (options) {
    console.log(options)
    return {
      from: 'menu',
      title: '狗年到！不捡副对联回去，咋知道你是“剩斗士”还是撒狗粮，越冬，越要燃，快来测一测！',
      path: '/pages/index/index?id=123',
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
