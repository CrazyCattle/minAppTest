// pages/dl/dl.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dooruser: undefined,
    form_id: undefined,
    sharer_id: undefined,
    bnShow: false
  },
  regame() {
    wx.navigateTo({
      url: '../dati/dati'
    })
  },
  // 保存图片
  saveImgToPhotosAlbumTap() {
    console.log(`https://static.mohuso.com/share/dooryear${this.data.dooruser}.jpg`)
    wx.downloadFile({  
      url: `https://static.mohuso.com/share/dooryear${this.data.dooruser}.jpg`,  
      success: (res) => {  
        console.log(res)  
        wx.saveImageToPhotosAlbum({  
          filePath: res.tempFilePath,  
          success: (res) => {  
            console.log(res) 
            if (res.errMsg == 'saveImageToPhotosAlbum:ok') {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 1500
              })
            } 
          },  
          fail: (res) => {  
            throw Error(res) 
          }  
        })  
      },  
      fail: () => {  
        console.log('fail')
      }  
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.aboutUser);
    console.log(options.openid, options.dooruser);
    if (!!options.from_id) {
      console.log(options.from_id);
    }

    this.setData({
      sharer_id: app.aboutUser.sharer_id
    });
    if (options.form_id) {
      this.setData({
        dooruser: options.form_id
      });
    }
    if (!!options.dooruser) {
      this.setData({
        dooruser: options.dooruser
      });
      app.aboutUser.dooruser = options.dooruser
    }
    wx.request({
      url: `https://www.mohuso.com/port/yearGetUser?wxtoken=${app.globalData.openid}`,
      method: 'GET',
      success: (res) => {
        app.aboutUser = res.data.result
      },
      fail: (res) => {
        throw Error(res)
      },
      complete: (res) => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    console.log(options);
    return {
      from: "button",
      title: "狗年好运到，捡副对联让好友拜年，墨狐搜给你发红包！",
      // path: `/pages/view/view?from_id=${this.data.sharer_id}&dooruser=${this.data.dooruser}`,
      path: `/pages/index/index?from_id=${this.data.sharer_id}`,
      success: function(res) {
        // console.log("转发成功");
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function(res) {
       throw Error(res);
      }
    };
  }
});
