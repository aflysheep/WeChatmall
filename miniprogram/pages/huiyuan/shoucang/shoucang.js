// pages/huiyuan/shoucang/shoucang.js
let app = getApp();
//获取数据库引用
const db = wx.cloud.database();
const goodsListDB = db.collection('goodslist');

const db2 = wx.cloud.database();
const goods_commentDB = db2.collection('goods_comment');

const db3 = wx.cloud.database();
const collectionDB = db3.collection('collection');

var u_openid = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collection: [],
    col: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'u_openid',
      success: function (res) {
        u_openid = res.data

      },
    })
    collectionDB.where({
      _openid: 'ofz0W0dH4YCdkeCJFtRUe85lwRcA'
    }).get({
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          goodsListDB.where({
            _id: res.data[i].cpid
          }).get({
            success(res) {
              that.data.col.push(res.data);
              console.log(res.data)
              wx.cloud.downloadFile({
                fileID: res.data[0].u_fileID
              }).then(res => {
                for (var k = 0; k < that.data.col.length; k++) {
                  that.data.col[k][0].u_fileID = res.tempFilePath
                  console.log(that.data.col[k][0].u_fileID)
                }

              }).catch(error => {
                // handle error
              })
              that.setData({
                collection: that.data.col
              })
            }
          })

        }

      }
    })

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
  delete: function (e) {
    console.log(e.currentTarget.dataset.scid)
    collectionDB.where({
      cpid: e.currentTarget.dataset.scid
    }).get({
      success(res) {
        console.log(res.data)
        collectionDB.doc(res.data[0]._id).remove({
          success(res) {
            wx.showToast({
              title: '删除成功',
            })
          }
        })
      }
    })
  }
})