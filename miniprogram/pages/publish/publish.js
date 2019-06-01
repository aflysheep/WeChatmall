var app = getApp();
//获取数据库引用
var u_fileID = '';
const db = wx.cloud.database();
const goodsListDB = db.collection('goodslist');
var add_date = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url: "",
    classify: ['学习', '运动', '生活'],
    dizhi: ['雅安校区', '温江校区', '都江堰校区'],
    title: "",
    info: "",
    point: "",
    price: "",
    productID: 0,
    category: [],
    categoryInd: -1, //类别
    typeInd: 0, //类型
    stateInd: 1, //状态
    banner: [], //轮播图片
    bannerNew: '', //........................................
    bannerAll: [],
    detail: [], //详情图片
    detailNew: [],
    detailAll: [],
    checkUp: true, //判断从编辑页面进来是否需要上传图片
    chooseViewShowDetail: true,
    chooseViewShowBanner: true,
    params: {
      productID: 0,
      contentFile: "",
      bannerFile: "",
      check: false,
    },
    dis: false,
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    add_date = Y + '/' + M + '/' + D;
  },
  /**
   * 获取标题
   */
  /** 选择图片detail */
  chooseDetail: function() {
    var im_url = this;
    var that = this;
    var img_url = ''

    wx.chooseImage({
      count: 3,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const tempFilePaths = res.tempFilePaths
        let randString = "books/" + Math.floor(Math.random() * 10000).toString() + '.png'
        img_url = randString //保存图片地址
        wx.cloud.uploadFile({
          cloudPath: randString, // 上传至云端的路径
          filePath: tempFilePaths[0], // 小程序临时文件路径
          success: res => {
            //将fileID写入缓存
            wx.setStorage({
              key: 'u_img_fileID',
              data: res.fileID,
            })
            photos.add({
              data: {
                image: res.fileID
              }
            }).then(res => {
              title: '上传成功'
            })

          }


        })
        //detail中包含的可能还有编辑页面下回显的图片，detailNew中包含的只有所选择的图片
        let detail = that.data.detail;
        detail = detail.concat(res.tempFilePaths);
        let detailNew = that.data.detailNew
        detailNew = detailNew.concat(res.tempFilePaths)
        wx.getStorage({
          key: 'u_img_fileID',
          success: function(res) {
            u_fileID = res.data
          },
        })
        that.setData({
          detail: detail,
          detailNew: detailNew,
          checkUp: false
        })


      }
    })

  },

  formSubmit: function(e) {
    var oid;
    var that = this;
    wx.getStorage({
      key: 'u_img_fileID',
      success: function(res) {
        u_fileID = res.data
      },
    })

    wx.getStorage({
      key: 'img_url',
      success: function(res) {
        that.setData({
          img_url: res.data
        })
      },
    })
    wx.cloud.callFunction({
      name: 'getuserinfo',
      complete: res => {
        oid = res.result.openid
      }
    })

    var that = this;
    var chenggong = this;
    //console.log("密码2：" + e.detail.value.upwd2)
    var gtitle = e.detail.value.title;
    var gprice = e.detail.value.price;
    var ginfo = e.detail.value.info;
    var gpoint = e.detail.value.point;
    var gcategory = e.detail.value.category;
    var gtype = e.detail.value.type;
    var gstate = e.detail.value.state;
    var dizhi = e.detail.value.dizhi;
    // var uname = e.detail.value.uname;
    var asda = 1;
    //var img_url = that.data.img_url;
    if (asda > 0) {
      if (asda > 0) {
        //可以提交数据了
        //that.setData({ error: "" })
        //开始提交数据
        goodsListDB.add({
          data: {
            gtitle: gtitle,
            gprice: gprice,
            ginfo: ginfo,
            gpoint: gpoint,
            gcategory: gcategory,
            gtype: gtype,
            gstate: gstate,
            //img_url: img_url,
            u_fileID: u_fileID,
            inc: 0,
            add_date: add_date,
            dizhi: dizhi
          }
        }).then(res => {
          that.setData({
            detail: '',
            gtitle: '',
            gprice: '',
            ginfo: '',
            gpoint: '',
            gcategory: '',
            gtype: '',
            gstate: '',
            //img_url: img_url,
            u_fileID: ''
          })
          wx.showToast({
            title: '发布成功',
            // icon: 'success'
          })
          // wx.navigateTo({
          //   url: '../../huiyuan/huiyuan'
          // })
        })
      }
    }
  },
  remove: function(event) {
    // goodsListDB.doc("XJzjFpT75u222olq").remove({
    //   success:function(res){
    //     wx.showToast({
    //       title: '删除成功',
    //       duration:2000
    //     })
    //   },
    //   fail:function(res){
    //     wx.showToast({
    //       title: '删除失败',
    //       duration:2000
    //     })
    //   }
    // })

  }
})