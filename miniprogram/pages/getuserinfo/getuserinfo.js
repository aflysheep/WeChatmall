// pages/getuserinfo/getuserinfo.js
const db = wx.cloud.database();
const photos = db.collection('photos');
const goodsListDB = db.collection('goodslist');

var u_img_url_test = '';
var add_date='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_ur:"",
    search_list:[],
    sort_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     wx.getUserInfo({
        success: function (res) {
 
            console.log(res);
          
        }
    })


    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    add_date = Y + '/' + M + '/' + D;
    console.log(add_date)
    var that =this;
    // wx.getStorage({
    //   key: 'name',
    //   success: function(res) {
    //     console.log("登录数据缓存测试："+res.data)
    //   },
    // })

    // wx.getStorage({
    //   key: 'img_url',
    //   success(res) {
    //     console.log("getuserinfo的img_url"+res.data)
    //   }
    // })
    wx.cloud.callFunction({
      name: 'getuserinfo',
      complete: res => {
        console.log('callFunction test result: ', res.result)
        //console.log(res.result.openid)
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
    // //获取缓存中的fileID
    // wx.getStorage({
    //   key: 'u_img_fileID',
    //   success: function(res) {
    //     u_img_url_test = res.data
    //   },
    // })
    // //console.log("我的阿偶算法" + u_img_url_test)
    // wx.cloud.downloadFile({
      
    //   fileID: u_img_url_test,
    //   success: res => {
    //     // get temp file path
    //     //console.log(res.tempFilePath)
    //     this.setData({
    //       image_ur: res.tempFilePath
         
    //     })

    //   },
    //   fail: err => {
    //     // handle error
    //   }
    // })

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
  upload: function (event) {

    


    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        let randString = "books/"+Math.floor(Math.random() * 10000).toString() + '.png'
        wx.cloud.uploadFile({
          cloudPath: randString, // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            //console.log(res.fileID)
            //将fileID写入缓存
            wx.setStorage({
              key: 'u_img_fileID',
              data: res.fileID,
            })

            // 返回文件 ID
            photos.add({
              data: {
                image: res.fileID
              }
            }).then(res => {
              
              wx.showToast({
                title: '上传成功',
                // icon: 'success'
              })
            })
            //console.log(res.fileID)
          },
          fail: console.error
        })
        //console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
   

  },
  search:function(e){
    const db2 = wx.cloud.database();
    db2.collection('goodslist').where({   //使用正则查询，实现对搜索的模糊查询
      gtitle: db2.RegExp({
        regexp: '风扇',                   //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',                     //大小写不区分
      })
    }).get({
      success: res => {
        console.log(res)
        that.setData({
          search_list: res.data
        })
      }
    })
  },
  sort_byinc:function(e){
    var that=this;
    const db5 = wx.cloud.database()
    //按inc降序
    db5.collection('goodslist')
      .orderBy('inc', 'desc')
      .get({
        success:function(res){
          console.log(res)
          that.setData({
            sort_list:res.data
          })
        }
      })
  },
  fenlei:function(e){
    const db6 = wx.cloud.database()
    db6.collection('goodslist').where({
      dizhi:'生活'//value为用户选择的类别
    }).get({
        success: function(res){
          console.log(res)
        }
      })
  },
  chaxun:function(e){
    var that =this;
  goodsListDB.where({
    _openid: 'ofz0W0dH4YCdkeCJFtRUe85lwRcA' // 填入当前用户 openid
  }).get().then(res => {
    console.log(res.data)
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
})