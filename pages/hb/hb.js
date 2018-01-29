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
      },
      {
        title: `团年的晚上，大姑大姨齐聚一堂，审问会即将开始，面对你好久耍朋友，你好久结婚的世纪难题你应该怎么对付？`,
        a: [
          { s: '拼命给他们夹菜堵住他们的嘴' },
          { s: '一提到自己就转移话题' },
          { s: '一直傻笑' }
        ]
      },
      {
        title: `你会如何处理拜年收到的红包？`,
        a: [
          { s: '存起来' },
          { s: '大吃大喝花光' },
          { s: '用一半，留一半' }
        ]
      },
      {
        title: `年过去了，假如马上你就要奔三了，想想一下三十岁的人，怎样的生活最令你神往？`,
        a: [
          { s: '结婚生子，朝九晚五工作周末陪孩子' },
          { s: '单身一人，抛开一切烦恼，环游世界去' }
        ]
      },
      {
        title: `对于过年，是不是惧怕七大姑八大姨的碎碎念?`,
        a: [
          { s: '是的' },
          { s: '还好' },
          { s: '不是' }
        ]
      },
      {
        title: `你觉得红包是微信过瘾还是实实在在发到自己手里的感觉过瘾?`,
        a: [
          { s: '微信抢' },
          { s: '实实在在发到手里' },
          { s: '无所谓' }
        ]
      },
      {
        title: `马上就要过年了，可你还没有筹办过年用品，现在在你的面前有一些过年必备品，如果只能选择一样，你会选择哪一样呢?`,
        a: [
          { s: '水饺' },
          { s: '新衣服' },
          { s: '让自己瞬间变美的魔法卡片' }
        ]
      },
      {
        title: `下面几种糖果，在新年到来的时候，你喜欢吃哪一种？`,
        a: [
          { s: '巧克力' },
          { s: '水果糖' },
          { s: '夹心糖' }
        ]
      },
      {
        title: `下面几种糖果，在新年到来的时候，你喜欢吃哪一种？`,
        a: [
          { s: '萝卜糕' },
          { s: '凤梨酥' },
          { s: '莲子银耳汤' },
          { s: '花生糖' },
          { s: '桂圆红枣茶' }
        ]
      },
      {
        title: `春节的时候你最喜欢和家人一起`,
        a: [
          { s: '一起聊天' },
          { s: '玩麻将' },
          { s: '一起做饭' }
        ]
      },
      {
        title: `如果可以让你更改点什么的话，你希望在春节其间更改？`,
        a: [
          { s: '生活方式' },
          { s: '说话态度' },
          { s: '外型和体型' }
        ]
      },
      {
        title: `春节期间，你最喜欢什么样的天气？`,
        a: [
          { s: '温暖的天气 ' },
          { s: '略有寒意的天气' },
          { s: '无所谓' }
        ]
      }
    ]
  },

  tapAnswer(e) {
    console.log(e.currentTarget.dataset.key)
    this.setData({
      tap: true,
      temp: e.currentTarget.dataset.key
    })
    if (this.data.curShow < 14) {
      this.setData({
        color: 'color' + e.currentTarget.dataset.key
      })

      this.timer = setTimeout(() => {
        this.setData({
          curShow: ++this.data.curShow,
          tap: false
        })
        clearTimeout(this.timer)
      }, 300)

    } else {
      console.log('答完全部题了~')
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