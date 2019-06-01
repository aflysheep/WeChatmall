//index.js
let app = getApp();
//获取数据库引用
const db = wx.cloud.database();
const goodsListDB = db.collection('goodslist');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      xinxis: [],
      zuixins: [],
    pageIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    //最新上架产品
    // wx.request({
    //   url: 'http://www.yaoyiwangluo.com/wx_CpList_top4.asp',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       zuixins: res.data
    //     })
    //   }
    // })
    goodsListDB.where({
      //_openid: 'ofz0W0dH4YCdkeCJFtRUe85lwRcA' // 填入当前用户 openid
    }).get().then(res => {
      //console.log(res.data)
      for(var i=0;i<res.data.length;i++){
        wx.cloud.downloadFile({
          fileID: res.data[i].u_fileID,
          success: res => {
            // get temp file path
            //console.log(res.tempFilePath)
            res.data[i] = res.tempFilePath
          },
          fail: err => {
            // handle error
          }
        })
        that.setData({
          zuixins: res.data
        })
      }
      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
   
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    wx.showToast({
      title: '已刷新',
    })
    that.setData({
      pageIndex: 0, // 每次触发下拉事件pageIndex=0
    })
    goodsListDB.where({
      //_openid: 'ofz0W0dH4YCdkeCJFtRUe85lwRcA' // 填入当前用户 openid
    }).get().then(res => {
      //console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        wx.cloud.downloadFile({
          fileID: res.data[i].u_fileID,
          success: res => {
            // get temp file path
            //console.log(res.tempFilePath)
            res.data[i] = res.tempFilePath
          },
          fail: err => {
            // handle error
          }
        })
        that.setData({
          zuixins: res.data
        })
      }

    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉加载")
    var that = this;
   
    // 上拉获取更多数据
    console.log("下拉刷新")
    wx.showToast({
      title: '已刷新',
    })
    that.setData({
      pageIndex: 0, // 每次触发下拉事件pageIndex=0
    })
    goodsListDB.where({
      //_openid: 'ofz0W0dH4YCdkeCJFtRUe85lwRcA' // 填入当前用户 openid
    }).get().then(res => {
      //console.log(res.data)
      for (var i = 0; i < res.data.length; i++) {
        wx.cloud.downloadFile({
          fileID: res.data[i].u_fileID,
          success: res => {
            // get temp file path
            //console.log(res.tempFilePath)
            res.data[i] = res.tempFilePath
          },
          fail: err => {
            // handle error
          }
        })
        that.setData({
          zuixins: res.data
        })
      }

    })
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  navigateTo: function(event) {
    wx.navigateTo({

      url: '../xiangqing/xiangqing',
      success: res => {
        console.log(res)
      }
    })
  }
})