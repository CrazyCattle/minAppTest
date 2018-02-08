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
    console.log("regame");
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
    }
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
      title:
        "狗年到！不捡副对联回去，咋知道你是“剩斗士”还是撒狗粮，越冬，越要燃，快来测一测！",
      path: `/pages/view/view?from_id=${this.data.sharer_id}&dooruser=${
        this.data.dooruser
      }`,
      success: function(res) {
        console.log("转发成功");
      },
      fail: function(res) {
        console.log("转发失败");
      }
    };
  }
});
