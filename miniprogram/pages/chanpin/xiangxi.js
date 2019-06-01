const WxParse = require('../../wxParse/wxParse.js')
let app = getApp();
//获取数据库引用
const db = wx.cloud.database();
const goodsListDB = db.collection('goodslist');

const db2 = wx.cloud.database();
const goods_commentDB = db2.collection('goods_comment');

const db3 = wx.cloud.database();
const collectionDB = db3.collection('collection');
var cpid = '';
var u_openid = '';
var name = '';
var add_date = '';
var phone='';
var info='';
var inc=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 300,
    gprice: 100,
    is_shoucang: 0,
    goods_info: {
      info:'',
      phone:'',
      goods_title: "",
      goods_id: 1,
      goods_title: "商品标题1",
      goods_price: '100',
    },
    goods_img: "",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },

  //商品收藏
  shoucang: function (e) {
    collectionDB.add({
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        cpid: cpid,
        u_openid: u_openid,
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.showToast({
          title: '收藏成功',
        })
      }
    })
  },


  textareasubmit: function (e) {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    add_date = Y + '/' + M + '/' + D;
    console.log(e.detail.value.t2)
    wx.getStorage({
      key: 'u_openid',
      success: function (res) {
        u_openid = res.data
      },
    })
    wx.getStorage({
      key: 'name',
      success: function (res) {
        name = res.data
      },
    })
    goods_commentDB.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        cpid: cpid,
        u_openid: u_openid,
        add_date: add_date,
        comment: e.detail.value.comment
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  toChat: function () {
    wx.navigateTo({
      url: '../socket/socket'
    })
  },
  onLoad: function (options) {
    cpid = options.cpid;
    u_openid = options._openid;
    phone = options.phone;
    console.log(phone)
    var that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          winHeight: res.windowHeight
        })
      }
    })
    var that = this
    console.log("cpid" + options.cpid)
    goodsListDB.where({
      _id: options.cpid // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      that.setData({
        phone:res.data[0].gpoint,
        gprice: res.data[0].gprice,
        goods_img: res.data[0].u_fileID,
        goods_title: res.data[0].gtitle,
        info:res.data[0].ginfo
      })
    })
    goodsListDB.where({
      _id: cpid,
    })
      .get({
        success(res){
          inc=res.data[0].inc+1;
          console.log("这是我的inc")
          console.log(res.data[0])
          goodsListDB.doc(cpid).update({
            // data 传入需要局部更新的数据
            data: {
              // 表示将 done 字段置为 true
              inc: inc
            },
            success: console.log,
            fail: console.error
          })

        }
      })
    
   
    
  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist // 需要预览的图片http链接列表  
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
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  huadong: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  select00: function (e) {
    var that = this;
    var key = e.currentTarget.dataset.key + 1
    console.log("得分：" + key)
    that.setData({
      key: key - 1,
      key2: key
    })
  },

  textareasubmit: function (e) {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    add_date = Y + '/' + M + '/' + D;
    console.log(e.detail.value.t2)
    wx.getStorage({
      key: 'u_openid',
      success: function (res) {
        u_openid = res.data
      },
    })
    wx.getStorage({
      key: 'name',
      success: function (res) {
        name = res.data
      },
    })
    goods_commentDB.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        cpid: cpid,
        u_openid: u_openid,
        add_date: add_date,
        comment: e.detail.value.comment
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.showToast({
          title: '评论提交成功',
        })
      }
    })

  },
})