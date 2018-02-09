const app = getApp();
// pages/phb/phb.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // avarpicUrl: app.gloablData
    timer: null,
    showLoading: false,
    loadPage: 1,
    canLoadingMore: true,
    scrollTop: 0,
    aboutUser: {},
    phb: [],
    openid: ''
  },
  lower() {
    // 排行榜 无限加载
    console.log(this.data.canLoadingMore)
    if (this.data.canLoadingMore) {
      this.setData({
        showLoading: true,
        // loadPage: this.data.loadPage++
      });
      if (this.timer) {
        console.log(111);
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        wx.request({
          url: `https://www.mohuso.com/port/yearUserFriends?wxtoken=${this.data.openid}&p=${this.data.loadPage}`,
          method: "GET",
          success: res => {
            console.log(res);
            let count = res.data.count
            let data = res.data.result
            if (count == '0') {
              this.setData({
                canLoadingMore: !this.data.canLoadingMore
              })
            }
            this.setData({
              phb: this.data.phb.concat(data),
              showLoading: false
            });
            clearTimeout(this.timer);
          },
          fail: function(err) {
            throw Error(err);
          },
          complete: function(res) {
            console.log(res);
          }
        });
      }, 500);
    }
    // this.setData({
    //   showLoading: true,
    //   loadPage: this.data.loadPage++
    // });
    // if (this.timer) {
    //   console.log(111);
    //   clearTimeout(this.timer);
    // }
    // this.timer = setTimeout(() => {
    //   this.setData({
    //     phb: this.data.phb.concat(this.data.mockData),
    //     showLoading: false
    //   });
    //   clearTimeout(this.timer);
    // }, 500);
  },
  viewDL(e) {
    wx.navigateTo({
      url: `../view/view?dooruser=${e.currentTarget.dataset.id}&shareid=${e.currentTarget.dataset.shareid}`
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.openid, `https://www.mohuso.com/port/yearUserFriends?wxtoken=${options.openid}&p=${this.data.loadPage}`);
    wx.request({
      url: `https://www.mohuso.com/port/yearUserFriends?wxtoken=${options.openid}&p=${this.data.loadPage}`,
      method: "GET",
      success: res => {
        this.setData({
          openid: options.openid
        })
        let count = res.data.count
        if (count == '0') {
          this.setData({
            canLoadingMore: false
          })
        }
        this.setData({
          phb: res.data.result,
          loadPage: ++this.data.loadPage
        });
      },
      fail: function(err) {
        throw Error(err);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log(app.aboutUser);
    this.setData({
      aboutUser: app.aboutUser
    });
  },

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
  onReachBottom: function() {}
});
