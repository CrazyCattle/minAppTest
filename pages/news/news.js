var num = 10
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originData: [],
    scrollTop: 100,
    timer: null
  },
  GetPageData(n, para) {
    const self = this
    wx.request({
      url: `https://cnodejs.org/api/v1/topics?page=1&limit=${n}`,
      method: 'GET',
      success(res) {
        console.log(res)
        if (para) {
          wx.hideNavigationBarLoading(); 
          self.setData({
            originData: res.data.data
          })
          num = num + 10
        } else {
          self.setData({
            originData: res.data.data
          })
        }
      },
      fail() { },
      complete() { }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetPageData(num, false)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  lower(e) {
    wx.showNavigationBarLoading();
    const self = this
    if (self.timer) {
      clearTimeout(self.timer)
    }
    self.timer = setTimeout(() => {
      self.GetPageData(num + 10, true)
    }, 1000)
  }
})