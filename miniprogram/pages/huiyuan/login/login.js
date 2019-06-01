// pages/huiyuan/login/login.js
let app = getApp();
// 获取数据库引用
const db = wx.cloud.database();
const userListDB = db.collection('userlist');
var u_openid='';
let name = null;
let password = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    openid: "",
    pwd: ""
  },
  toLogin: function(e) {
    var phone = e.detail.value.phone;
    var pwd = e.detail.value.pwd;

    userListDB.where({
      phone: phone,
      pwd:pwd
    }).get().then(res => {
      //console.log(res.data[0].password)
      console.log(res.data[0])
      //返回信息写入缓存
      wx.setStorage({
        key: 'phone',
        data: res.data[0].phone,
        success: function () {
          console.log("用户名写入缓存成功")

        }
      })
      wx.setStorage({
        key: 'u_openid',
        data: res.data[0]._openid,
        success: function () {
          console.log("u_openid写入缓存成功")
          // wx.reLaunch({
          //   url: '/pages/huiyuan/huiyuan',
          // })
        }
      })
      wx.setStorage({
        key: 'pwd',
        data: res.data[0].pwd,
        success:res=>{
          console.log("pwd写入缓存成功")
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })     
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toReg:function(event){
    wx.navigateTo({
      url: '/pages/huiyuan/zhanghao/reg',
    })
  }
})