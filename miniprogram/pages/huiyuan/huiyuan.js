// pages/huiyuan/huiyuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      str_u_login:"",
      str_u_id:"",
      str_u_name:""
  },
  toReg: function () {
    wx.navigateTo({
      url: '/pages/huiyuan/zhanghao/reg',
    })
    },
  
 // 微信登陆
  getWxInfo: function () {

    var myid = "";
    var mynicheng = "";
    var mytouxiang = ""


    wx.getUserInfo({
      success: function (res) {
        //console.log(res.userInfo)
        //console.log("头像：" + res.userInfo.avatarUrl)
        //console.log("昵称：" + res.userInfo.nickName)
        //console.log("性别：" + res.userInfo.gender)
        mynicheng = res.userInfo.nickName;
        mytouxiang = res.userInfo.avatarUrl
      }
    })

    wx.login({
      success(res) {
        //console.log("res.code："+res.code)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wxc5e0e9e50f9476d3',
            secret: '78f4e88fac60687856a08c18727c065a',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: "GET",
          success: function (res) {
            //获取用户的openid
            //console.log(res.data)
            //console.log("用户的openid：" + res.data.openid)
            myid = res.data.openid


            wx.request({
              url: 'http://www.yaoyiwangluo.com/wx_check_reg_yonghu-weixin.asp',
              data: {
                wx_openid: myid,
                wx_nicheng: mynicheng,
                wx_touxiang: mytouxiang
              },
              success: function (res) {
                console.log(res.data)
                //返回信息写入缓存
                wx.setStorage({
                  key: 'u_login',
                  data: 'yes',
                  success: function () {
                    console.log("写入缓存成功")
                  }
                })
                wx.setStorage({
                  key: 'u_id',
                  data: res.data.uid,
                  success: function () {
                    wx.reLaunch({
                      url: '/pages/huiyuan/huiyuan',
                    })
                  }
                })
                wx.setStorage({
                  key: 'u_name',
                  data: "",
                })
              }
            })


          }
        })
      }
    })



  },

  // getWxInfo:function(event){
  //   wx.getUserInfo({
  //     success:function(res){
  //       console.log(res.userInfo)
  //     }
  //   })
  // },
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

  }
})