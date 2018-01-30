const app = getApp()
// pages/phb/phb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // avarpicUrl: app.gloablData
    scrollTop: 0,
    phb: [
      {
        mc: 1,
        pic_url: '../../images/o_u_pic.png',
        zan: 50
      },
      {
        mc: 2,
        pic_url: '../../images/o_u_pic.png',
        zan: 45
      },
      {
        mc: 3,
        pic_url: '../../images/o_u_pic.png',
        zan: 30
      },
      {
        mc: 4,
        pic_url: '../../images/o_u_pic.png',
        zan: 10
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5
      }
    ]
  },
  lower () {
    console.log(1)
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData)
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})