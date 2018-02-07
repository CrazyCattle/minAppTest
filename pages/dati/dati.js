Page({
  data: {
    curShow: 0,
    temp: undefined,
    tap: false,
    timer: null,
    randowQ: [],
    question: [
      {
        title: `春节是中国的传统节日，是热闹的
      一天，也是喜庆的日子。在春节里
      做什么对你来说是最有意义的呢？`,
        a: [
          { s: '讨红包' },
          { s: '团圆饭' },
          { s: '贴春联' },
          { s: '拜年' }
        ]
      },
      {
        title: `你认为过年放鞭炮是为了什么？`,
        a: [
          { s: '热闹' },
          { s: '图个吉利 ' },
          { s: '好玩' }
        ]
      },
      {
        title: `你对于贴春联有什么看法？`,
        a: [
          { s: '无所谓，可贴可不贴' },
          { s: '认为没必要' },
          { s: '非常重视 一定要贴' }
        ]
      },
      {
        title: `春节聚会中你最不愿意谈论的话题是`,
        a: [
          { s: '自己/孩子工作情况或学习情况' },
          { s: '个人问题（如联系/结婚/生子）' },
          { s: '收入问题或升职问题' }
        ]
      }
    ]
  },

  tapAnswer(e) {
    console.log(this.data.question.length)
    
    console.log(e.currentTarget.dataset.key)
    this.setData({
      tap: true,
      temp: e.currentTarget.dataset.key
    })

    if (this.data.curShow < this.data.question.length-1) {
      this.timer = setTimeout(() => {
        this.setData({
          curShow: ++this.data.curShow,
          tap: false
        })
        clearTimeout(this.timer)
      }, 300)

    } else {
      wx.navigateTo({
        url: '../duilian/dl?openid=23214214',
        success: function(res){
          console.log('答完了！！')
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
    console.log(this.data.curShow)
  },
  replay () {
    this.setData({
      curShow: 0
    })
    console.log(this.curShow)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})