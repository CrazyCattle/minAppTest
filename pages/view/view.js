// pages/view/view.js

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dl_id: undefined,
    shareid: 0,
    wishUserList: []
  },
  bn() {
    console.log("拜年了！！！！");
    wx.request({
      url: `https://www.mohuso.com/port/yearBlessing?sharer_id=${app.aboutUser.sharer_id}&object_id=${this.data.shareid}`,
      method: 'GET',
      success: (res) => {
        console.log(res, '拜年请求数据')
        if (res.data.error == '0') {
          wx.showToast({
            title: '拜年成功',
            icon: 'success',
            duration: 1500,
            success: () => {
              setTimeout(() => {
                wx.navigateTo({
                  url: `../phb/phb?openid=${app.globalData.openid}`
                })
              },1500)
            }
          })
        } else if (res.data.error == '1') {
          wx.showToast({
            title: res.data.errortip,
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: (err) => {
        throw Error(err)
      },
      complete: () => {
        // complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shareid: options.shareid
    })
    console.log("拜年了！！！！");
    if (options.dooruser) {
      this.setData({
        dl_id: options.dooruser
      });
    }
    if (!!options.from_id) {
      console.log(options.from_id);
    }
    wx.request({
      url: `https://www.mohuso.com/port/yearUserWish?sharer_id=${this.data.shareid}`,
      method: 'GET',
      success: (res) => {
        console.log(res)
        if (res.data.error == '0') {
          this.setData({
            wishUserList: res.data.result
          })
          console.log(this.data.wishUserList)
        } else {
          console.log('无好友')
        }
      },
      fail: (res) => {
        throw Error(res)
      },
      complete: (res) => {
        console.log('获取祝福好友完成。')
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
  onUnload: function() {}
});
