//获取应用实例
const app = getApp();

Page({
  data: {
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    originData: [],
    showRuleMask: false,
    from_id: ""
  },
  sRule() {
    this.setData({
      showRuleMask: !this.data.showRuleMask
    });
  },
  getUserInformation() {
    const self = this;
    new Promise((resolve, reject) => {
      wx.request({
        url: `https://www.mohuso.com/port/judgeUser?wxtoken=${
          app.globalData.openid
        }`,
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
      if (res.data.error == "1") {
        wx.request({
          url:
            `https://www.mohuso.com/port/yearAddUser?wxtoken=${
              app.globalData.openid
            }&nickname=${app.globalData.nickname}&avatar=${
              app.globalData.avatar
            }` +
            `${!!self.data.from_id ? "&from_id=" + self.data.from_id : ""}`,
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
        wx.request({
          url: `https://www.mohuso.com/port/yearGetUser?wxtoken=${
            app.globalData.openid
          }`,
          method: "GET",
          success: function(res) {
            app.aboutUser = res.data.result;
            console.log(app.aboutUser);
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
  onShow: function() {
    console.log("onShow");
  },
  onHide: function() {
    console.log("onHide");
  },
  onUnload: function() {
    console.log("onUnload");
  },
  onLoad: function(options) {
    const self = this;
    if (!!options.from_id) {
      console.log("我从分享那里来....---------" + options.from_id);
      this.setData({
        from_id: options.from_id
      });
    }
    
    console.log(this.data.from_id)
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
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
        url: `https://www.mohuso.com/port/yearGetUser?wxtoken=${
          app.globalData.openid
        }`,
        method: "GET",
        success: function(res) {
          app.aboutUser = res.data.result;
          console.log(app.aboutUser);
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
          url: `../dati/dati?openid=${app.globalData.openid}`
        });
      } else if (e.currentTarget.id == "phb") {
        wx.navigateTo({
          url: `../phb/phb?openid=${app.globalData.openid}`
        });
      }
    } else {
      console.log(e, "拒绝时接受到的数据");
    }
  },
  // onShareAppMessage: function(options) {
  //   console.log(options);
  //   return {
  //     from: "menu",
  //     title:
  //       "狗年到！不捡副对联回去，咋知道你是“剩斗士”还是撒狗粮，越冬，越要燃，快来测一测！",
  //     path: `/pages/index/index?id=${app.globalData.openid}`,
  //     success: function(res) {
  //       console.log("转发成功");
  //     },
  //     fail: function(res) {
  //       console.log("转发失败");
  //     }
  //   };
  // }
});
