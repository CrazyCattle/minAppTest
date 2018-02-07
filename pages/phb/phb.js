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
        bns: 50,
        name: 'Mr.wu',
        openid: '1'
      },
      {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        bns: 50,
        name: '中文测试',
        openid: '2'
      },
      {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        bns: 50,
        name: '12丶3',
        openid: '3'
      }, {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        bns: 50,
        name: 'this is test',
        openid: '4'
      },
      {
        mc: 7,
        pic_url: '../../images/o_u_pic.png',
        bns: 50,
        name: 'this is test',
        openid: '5'
      }
    ],
    phb: [
      {
        mc: 1,
        pic_url: '../../images/o_u_pic.png',
        bns: 50,
        name: 'Mr.wu',
        openid: '6'
      },
      {
        mc: 2,
        pic_url: '../../images/o_u_pic.png',
        bns: 45,
        name: '中文测试',
        openid: '7'
      },
      {
        mc: 3,
        pic_url: '../../images/o_u_pic.png',
        bns: 30,
        name: '哈123丶123哈',
        openid: '8'
      },
      {
        mc: 4,
        pic_url: '../../images/o_u_pic.png',
        bns: 10,
        name: 'this is test',
        openid: '9'
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        bns: 5,
        name: 'this is test',
        openid: '10',
      }, {
        mc: 1,
        pic_url: '../../images/o_u_pic.png',
        bns: 50,
        name: 'Mr.wu',
        openid: '6'
      },
      {
        mc: 2,
        pic_url: '../../images/o_u_pic.png',
        bns: 45,
        name: '中文测试',
        openid: '7'
      },
      {
        mc: 3,
        pic_url: '../../images/o_u_pic.png',
        bns: 30,
        name: '哈123丶123哈',
        openid: '8'
      },
      {
        mc: 4,
        pic_url: '../../images/o_u_pic.png',
        bns: 10,
        name: 'this is test',
        openid: '9'
      },
      {
        mc: 5,
        pic_url: '../../images/o_u_pic.png',
        bns: 5,
        name: 'this is test',
        openid: '10',
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
  viewDL () {
    wx.navigateTo({
      url: '../view/view?openid=1111111',
      success: function(res){
        console.log(res)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
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