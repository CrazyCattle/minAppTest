const app = getApp();

Page({
  data: {
    curShow: 0,
    temp: undefined,
    tap: false,
    timer: null,
    dooruser: undefined,
    ans: {
      "Question-1": 0,
      "Question-2": 0,
      "Question-3": 0,
      "Question-4": 0,
      "Question-5": 0
    },
    question: []
  },

  tapAnswer(e) {
    // console.log(this.data.question.length)
    // console.log(e.currentTarget.dataset.key)
    this.setData({
      tap: true,
      temp: e.currentTarget.dataset.key
    });
    this.data.ans[e.currentTarget.dataset.ques] = e.currentTarget.dataset.bias;

    if (this.data.curShow < this.data.question.length - 1) {
      this.timer = setTimeout(() => {
        this.setData({
          curShow: ++this.data.curShow,
          tap: false
        });
        clearTimeout(this.timer);
      }, 300);
    } else {
      let QArr = [];
      let newArr = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      for (let key in this.data.ans) {
        QArr.push(this.data.ans[key]);
        var num = parseInt(this.data.ans[key]);
        newArr[num]++;
      }
      console.log(QArr, newArr);
      if (Math.max.apply(Math, newArr) == 1) {
        this.setData({
          dooruser: QArr[Math.floor(Math.random() * 5)]
        });
      } else {
        let maxNumber = Math.max.apply(Math, newArr);
        this.setData({
          dooruser: newArr.indexOf(maxNumber)
        });
      }

      wx.request({
        url: `https://www.mohuso.com/port/doorUser?wxtoken=${
          app.globalData.openid
        }&dooruser=${this.data.dooruser}`,
        method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: res => {
          if (res.data.error == "0") {
            wx.navigateTo({
              url: `../duilian/dl?openid=${app.globalData.openid}&dooruser=${
                this.data.dooruser
              }`
            });
          }
        },
        fail: err => {
          throw Error(err);
        },
        complete: res => {
          console.log("完成了");
        }
      });
    }
    // console.log(this.data.curShow);
  },
  replay() {
    this.setData({
      curShow: 0
    });
    console.log(this.curShow);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: "https://www.mohuso.com/port/getProblem",
      method: "GET",
      success: res => {
        console.log(res);
        if (res.data.error == "1") {
          this.setData({
            question: res.data.result
          });
        }
      },
      fail: err => {
        throw Error(err);
      },
      complete: res => {
        console.log("completed");
      }
    });
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
