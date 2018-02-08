// pages/ckcj/ckcj.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    test: 1,
    dooruser: undefined,
    ranking: 0
  },
  chkDL() {
    wx.navigateTo({
      url: `../duilian/dl?dooruser=${this.data.dooruser}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.dooruser);
    if (options.dooruser) {
      this.setData({
        dooruser: options.dooruser
      });
    }
    if (options.ranking) {
      this.setData({
        ranking: options.ranking
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
  onUnload: function() {}
});
