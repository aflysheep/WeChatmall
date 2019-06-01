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
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  chaxun:function(e){
    var that = this
    console.log(e.detail.value);
    const db2 = wx.cloud.database();
    db2.collection('goodslist').where({   //使用正则查询，实现对搜索的模糊查询
      gtitle: db2.RegExp({
        regexp: e.detail.value.neirong,                   //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',                     //大小写不区分
      })
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
  onLoad: function (options) {
    var that = this;
    console.log(options.fenlei);
    var fenlei = options.fenlei;
    if (fenlei!=null){
    goodsListDB.where({
      dizhi: fenlei // 填入当前用户 openid
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
    }else{
      var that = this
      const db5 = wx.cloud.database()
      //按inc降序
      db5.collection('goodslist')
        .orderBy('inc', 'desc')
        .get().then(res => {
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





    }

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
    // goodsListDB.where({
    //   _openid: 'ofz0W0dH4YCdkeCJFtRUe85lwRcA' // 填入当前用户 openid
    // }).get().then(res => {
    //   //console.log(res.data)
    //   for (var i = 0; i < res.data.length; i++) {
    //     wx.cloud.downloadFile({
    //       fileID: res.data[i].u_fileID,
    //       success: res => {
    //         // get temp file path
    //         //console.log(res.tempFilePath)
    //         res.data[i] = res.tempFilePath
    //       },
    //       fail: err => {
    //         // handle error
    //       }
    //     })
    //     that.setData({
    //       zuixins: res.data
    //     })
    //   }

    // })
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

  },
  navigateTo: function (event) {
    wx.navigateTo({

      url: '../xiangqing/xiangqing',
      success: res => {
        console.log(res)
      }
    })
  }
})