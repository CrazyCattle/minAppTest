const app = getApp()
// pages/phb/phb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // avarpicUrl: app.gloablData
    timer: null,
    showLoading: false,
    scrollTop: 0,
    aboutUser: {},
    phb: []
  },
  lower () {
    // 排行榜 无限加载
    this.setData({
      showLoading: true
    })
    if (this.timer) {
      console.log(111)
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.setData({
        phb: this.data.phb.concat(this.data.mockData),
        showLoading: false
      })
      clearTimeout(this.timer)
    }, 500)
  }, 
  viewDL (e) {
    wx.navigateTo({
      url: `../view/view?dooruser=${e.currentTarget.dataset.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.openid)
    wx.request({
      url: `https://www.mohuso.com/port/yearUserFriends?wxtoken=${options.openid}`,
      method: 'GET',
      success: (res) => {
        console.log(res)
        this.setData({
          phb: res.data.result
        })
      },
      fail: function(err) {
        throw Error(err)
      },
      complete: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.aboutUser)
    this.setData({
      aboutUser: app.aboutUser
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
  
  }
})