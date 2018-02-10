//获取应用实例
const app = getApp();

Page({
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    originData: [],
    showRuleMask: false,
    from_id: "",
    openid: app.globalData.openid || wx.getStorageSync("openid") || '',
    dooruser: 0,
    audioCtx: undefined,
    musicUrl: 'https://static.mohuso.com/share/music.mp3',
    musicState: true,
    musicCanPlay: true
  },
  sRule() {
    this.setData({
      showRuleMask: !this.data.showRuleMask
    });
  },
  getUserInformation() {
    console.log(`https://www.mohuso.com/port/judgeUser?wxtoken=${this.data.openid}`, '判断用户')
    
    const self = this;
    new Promise((resolve, reject) => {
      wx.request({
        url: `https://www.mohuso.com/port/judgeUser?wxtoken=${this.data.openid}`,
        method: "GET",
        success: function(res) {
          resolve(res);
        },
        fail: function(err) {
          reject(err);
        },
        complete: function(res) {
          resolve(res);
        }
      });
    }).then(res => {
      console.log(`https://www.mohuso.com/port/yearAddUser?wxtoken=${this.data.openid}&nickname=${app.globalData.nickname}&avatar=${app.globalData.avatar}` +
      `${!!self.data.from_id ? "&from_id=" + self.data.from_id : ""}`)
      console.log(res.data.error)
      if (res.data.error == "1") {
        console.log('我还没注册过')
        wx.request({
          url:
            `https://www.mohuso.com/port/yearAddUser?wxtoken=${this.data.openid}&nickname=${app.globalData.nickname}&avatar=${app.globalData.avatar}` +
            `${self.data.from_id ? "&from_id=" + self.data.from_id : ""}`,
          method: "GET",
          success: function(res) {
            console.log(res);
          },
          fail: function() {
            throw Error("获取判断用户的数据错误~~");
          },
          complete: function() {
            console.log("加载完成");
          }
        });
      } else if (res.data.error == "0") {
        console.log('我已经注册过')
        wx.request({
          url: `https://www.mohuso.com/port/yearGetUser?wxtoken=${this.data.openid}`,
          method: "GET",
          success: function(res) {
            console.log(res)
            console.log(app.aboutUser);
            app.aboutUser = res.data.result;
            self.setData({
              dooruser: app.aboutUser.dooruser
            })
            console.log(self.data.dooruser);
          },
          fail: function() {
            throw Error("获取用户数据错误~~");
          },
          complete: function() {
            console.log("加载用户数据完成~~");
          }
        });
      }
    });
  },
  onReady () {
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },
  onShow: function() {
    // console.log("onShow");
  },
  onHide: function() {
    // console.log("onHide");
  },
  onUnload: function() {
    // console.log("onUnload");
  },
  onLoad: function(options) {
    // 登录
    if (!app.globalData.userInfo) {
      new Promise((resolve, reject) => {
        wx.login({
          success: res => {
            // console.log(res);
            resolve(res);
          }
        });
      }).then(res => {
        // 获取 openid 以及 session_key
        wx.request({
          url: `https://www.mohuso.com/port/wxAuthorization?code=${res.code}`,
          method: "GET",
          success: res => {
            // console.log('dfjkasjfkd-------------', res)
            // console.log(res.data, res.data.error, res.data.result.openid)
            if (res.data.error == "0") {
              app.globalData.openid = res.data.result.openid;
              this.setData({
                'openid': res.data.result.openid
              })
              // console.log(app.globalData.openid, this.data.openid, 'index--');
              wx.setStorageSync("openid", res.data.result.openid);
              // console.log(wx.getStorageSync("openid"))
            }
          },
          fail: (res) => {
            throw Error(res)
          },
          complete: () => {
            // console.log('wx login')
          }
        });
      });
    }
    // console.log(this.data.openid, 'openid')
    // console.log('全局变量 ---------------', app)
    // if (app) {
    //   console.log(1)
    // } else {
    //   console.log(2)
    // }
    const self = this;
    if (!!options.from_id) {
      // console.log("我从分享那里来....---------" + options.from_id);
      this.setData({
        from_id: options.from_id
      });
    }
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      this.getUserInformation()
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      new Promise((resolve, reject) => {
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo;
            app.globalData.nickname = res.userInfo.nickName;
            app.globalData.avatar = res.userInfo.avatarUrl;
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            });
            resolve("success");
          }
        });
      }).then(res => {
        if (res == "success") {
          this.getUserInformation();
        }
      });
    }
  },
  getUserInfo: function(e) {
    if (!!e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });

      wx.request({
        url: `https://www.mohuso.com/port/yearGetUser?wxtoken=${this.data.openid}`,
        method: "GET",
        success: function(res) {
          app.aboutUser = res.data.result;
          // console.log(app.aboutUser);
          if (e.currentTarget.id == "ckZJ") {
            wx.navigateTo({
              url: `../choujiang/cj?dooruser=${
                app.aboutUser.dooruser
              }&ranking=${app.aboutUser.ranking}`
            });
          }
        },
        fail: function() {
          throw Error("获取用户数据错误~~");
        },
        complete: function() {
          console.log("加载用户数据完成~~");
        }
      });

      if (e.currentTarget.id == "start") {
        wx.navigateTo({
          url: `../dati/dati?openid=${this.data.openid}`
        });
      } else if (e.currentTarget.id == "phb") {
        wx.navigateTo({
          url: `../phb/phb?openid=${this.data.openid}`
        });
      }
    } else {
      console.log(e, "拒绝时接受到的数据");
    }
  },
  viewDL () {
    wx.navigateTo({
      url: `../duilian/dl?dooruser=${app.aboutUser.dooruser}`
    })
  },
  toggerMusic () {
    if (this.data.musicCanPlay) {
      this.audioCtx.pause()
    } else {
      this.audioCtx.play()
    }
    this.setData({
      musicState: !this.data.musicState,
      musicCanPlay: !this.data.musicCanPlay
    })
  }
});
