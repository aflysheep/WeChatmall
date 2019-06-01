// pages/huiyuan/zhanghao/reg.js
let app = getApp();
//获取数据库引用
const db = wx.cloud.database();
const userListDB = db.collection('userlist');
var u_openid = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: ""
  },


  zhuce: function(e) {
    var oid;
    wx.cloud.callFunction({
      name: 'getuserinfo',
      complete: res => {
        oid = res.result.openid
      }
    })

    var that = this;
    var chenggong = this;
    //console.log("用户提交了表单信息")
    //console.log("用户名" + e.detail.value.uname)
    var phone = e.detail.value.phone;
    var pwd1 = e.detail.value.pwd1;
    var pwd2 = e.detail.value.pwd2;
    if (phone.length > 0 && pwd1.length > 0 && pwd2.length > 0) {
      if (pwd1 == pwd2) {
        //可以提交数据了
        that.setData({
          error: ""
        })
        //开始提交数据
        userListDB.where({
          u_openid: u_openid
        }).get({
          success: function(res) {
            console.log(res.data)
            let userInfos = res.data;
            //console.log(userInfos)
            if (userInfos && userInfos.length > 0) {
              let user = userInfos[0];
              // console.log(user)
              // console.log(user.name)
              if (user && user.phone) {
                wx.showModal({
                  title: '提示',
                  content: '您已注册，确定要更新账号密码吗？',
                  success: function(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      //that.saveuserinfo();
                      let that = this;
                      userListDB.add({
                        data:{
                          phone:phone,
                          pwd:pwd1,
                          u_openid:u_openid
                        },
                        success(res){
                          wx.showToast({
                            title: '注册成功',
                          })
                          wx.navigateTo({
                            url: '/pages/huiyuan/login/login',
                          })
                        }
                      })
                    }
                  },
               
                  
                })

              }else{
                userListDB.add({
                  data:{
                    phone:phone,
                    pwd:pwd1,
                    u_openid:u_openid
                  },
                  success(res){
                    wx.navigateTo({
                      url: '/pages/huiyuan/huiyuan/login',
                    })
                  }
                })
              }
            } 
          }
          
        })
      }

    }
  },


  // zhuce: function (e) {
  //   var that = this;
  //   //console.log("用户提交了表单信息")
  //   console.log(e.detail.value)
  //   //console.log("用户名" + e.detail.value.uname)
  //   //console.log("密码1：" + e.detail.value.upwd1)
  //   //console.log("密码2：" + e.detail.value.upwd2)
  //   var uname = e.detail.value.uname;
  //   var upwd1 = e.detail.value.upwd1;
  //   var upwd2 = e.detail.value.upwd2;
  //   if (uname.length > 0 && upwd1.length > 0 && upwd2.length > 0) {
  //     if (upwd1 == upwd2) {
  //       //可以提交数据了
  //       that.setData({ error: "" })
  //       //开始提交数据
  //       wx.request({
  //         url: 'http://www.yaoyiwangluo.com/wx_check_reg_yonghu.asp',
  //         data: {
  //           yhm: uname,
  //           mm: upwd1
  //         },
  //         success: function (res) {
  //           console.log(res.data)
  //           if (res.data.zt == "yes") {
  //             console.log("注册成功:" + res.data.xinxi + ",用户id：" + res.data.uid)
  //             //将返回信息写入本地缓存，用以判断用户是否登陆和数据归属
  //             wx.setStorage({
  //               key: 'u_login',
  //               data: 'yes',
  //               success: function () {
  //                 console.log("写入缓存成功")
  //               }
  //             })
  //             wx.setStorage({
  //               key: 'u_id',
  //               data: res.data.uid,
  //             })
  //             wx.setStorage({
  //               key: 'u_name',
  //               data: uname,
  //               success: function () {
  //                 //wx.navigateTo({
  //                 //  url: '/pages/huiyuan/index',
  //                 //})
  //                 wx.switchTab({
  //                   url: '/pages/huiyuan/huiyuan',
  //                 })
  //               }
  //             })


  //           } else if (res.data.zt == "no") {
  //             console.log("注册失败:" + res.data.xinxi + ",用户id：" + res.data.uid)
  //             that.setData({ error: res.data.xinxi })
  //           }
  //         }
  //       })


  //     } else {
  //       that.setData({ error: "两次输入密码不同" })
  //     }

  //   } else {
  //     that.setData({ error: "请填写完整的账号和密码信息！" })
  //   }

  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name: 'getuserinfo',
      complete: res => {
        //console.log('callFunction test result: ', res)
        console.log(res.result.openid)
        u_openid = res.result.openid;
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

  }
})