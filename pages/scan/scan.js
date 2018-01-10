var order = ['red', 'yellow', 'blue', 'green', 'red']
var num = 10
Page({
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
          self.setData({
            scrollTop: 100
          })
          num = num + 10
        } 
        self.setData({
          originData: res.data.data,
        })
      },
      fail() { },
      complete() { }
    })
  },
  onReady() {
    console.log('ready')
  },
  onLoad() {
    console.log('onLoad')
    this.GetPageData(num, false)
  },
  upper(e) { },
  lower(e) {
    const self = this
    if (self.timer) {
      clearTimeout(self.timer)
    }
    self.timer = setTimeout(() => {
      self.GetPageData(num + 10, true)
    }, 1000)
  },
  scroll(e) { },
  tap(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  scanCode() {
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    wx.navigateTo({
      url: '../news/news',
    })
  }
})