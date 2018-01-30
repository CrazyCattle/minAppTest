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
    mockData: [
      {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        zan: 50,
        name: 'this is test'
      },
      {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        zan: 50,
        name: 'this is test'
      },
      {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        zan: 50,
        name: 'this is test'
      }, {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        zan: 50,
        name: 'this is test'
      },
      {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        zan: 50,
        name: 'this is test'
      }
    ],
    phb: [
      {
        mc: 1,
        pic_url: '../../images/o_u_pic.png',
        zan: 50,
        name: 'this is test'
      },
      {
        mc: 2,
        pic_url: '../../images/o_u_pic.png',
        zan: 45,
        name: 'this is test'
      },
      {
        mc: 3,
        pic_url: '../../images/o_u_pic.png',
        zan: 30,
        name: 'this is test'
      },
      {
        mc: 4,
        pic_url: '../../images/o_u_pic.png',
        zan: 10,
        name: 'this is test'
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5,
        name: 'this is test'
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5,
        name: 'this is test'
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5,
        name: 'this is test'
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5,
        name: 'this is test'
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        zan: 5,
        name: 'this is test'
      }
    ]
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