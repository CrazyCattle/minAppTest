var num = 10
Page({
  /**
   * 页面的初始数据
   */
  data: {
    originData: [],
    timer: null
  },
  nav: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  GetPageData(n) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: `https://cnodejs.org/api/v1/topics?page=1&limit=${n}`,
        method: 'GET',
        success(res) {
          resolve(res.data.data.reverse())
          num += 10
        },
        fail(err) { reject(err) },
        complete(data) { console.log(data) }
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    self.GetPageData(num).then(res => {
      self.setData({
        originData: res
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const self = this
    wx.showNavigationBarLoading()
    self.GetPageData(num).then(res => {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      self.setData({
        originData: res
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   const self = this
  //   if (self.timer) {
  //     clearTimeout(self.timer)
  //   }
  //   self.timer = setTimeout(() => {
  //     self.GetPageData(num + 10, true)
  //   }, 1000)
  // }
})