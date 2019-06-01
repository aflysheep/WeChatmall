const db = wx.cloud.database();
const msgListDB = db.collection('msg');
var app = getApp();
Page({
  data: {
    socket_open: false, //判断连接是否打开
    sendText: "", //发送的消息
    serverMsg: [], //接受的服务端的消息
    userInfo: {
      userId: 1,
      name: "y",
      img: '头像'
    }, //app.appData.userInfo,
    scrolltop: 999
  },

  /**输入内容 */
  sendTextBind: function(e) {
    this.setData({
      sendText: e.detail.value
    });
    console.log(this.data.sendText);
  },
  /**发送消息 */
  sendBtn: function(e) {
    console.log('发送消息事件！');
    var msgJson = {
      user: {
        id: this.data.userInfo.userId, //app.appData.userInfo.userId, //唯一ID区分身份
        name: this.data.userInfo.name, //显示用姓名
        img: this.data.userInfo.img, //显示用头像
      },
      msg: this.data.sendText, //发送的消息
      groupid: 1,
      userBID:2
    }

    //发送消息
    this.send_socket_message(JSON.stringify(msgJson));
    msgListDB.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        userId: 1,
        msg: this.data.sendText
      },
      success(res) {
        console.log(res)
      },
      fail: console.error
    })
    this.setData({
      sendText: "" //发送消息后，清空文本框
    });
  },
  onLoad: function(options) {
    // app.login();
    // this.setData({
    //     userInfo: app.appData.userInfo
    // });
    //初始化
    this.wssInit();

   
   

  },
  wssInit() {
    var that = this;
    //建立连接
    wx.connectSocket({
      url: 'ws://localhost' //app.appData.socket
    })
    //监听WebSocket连接打开事件。
    wx.onSocketOpen(function(res) {
      console.log('WebSocket连接已打开！');
      that.setData({
        socket_open: true
      });
    });
    //监听WebSocket接受到服务器的消息事件。
    wx.onSocketMessage(function(res) {
      console.log('收到服务器内容：', res);
      var server_msg = JSON.parse(res.data);
      console.log(server_msg);
      if (server_msg != null) {
        var msgnew = [];
        for (var i = 0; i < server_msg.length; i++) {
          msgnew.push(JSON.parse(server_msg[i].msg));
        }
        msgnew = that.data.serverMsg.concat(msgnew);
        that.setData({
          serverMsg: msgnew,
          scrolltop: msgnew.length * 100
        });
        console.log(that.data.serverMsg);
      }
    });
    //监听WebSocket错误。
    wx.onSocketError(function(res) {
      console.log('WebSocket连接打开失败，请检查！', res)
    });
    msgListDB.where({
      userId: 2
    }).get().then(res => {
      var msgJson = {
        user: {
          id: 2, //app.appData.userInfo.userId, //唯一ID区分身份
          name: 's', //显示用姓名
          img: 'ds', //显示用头像
        },
        msg: res.data[0].msg, //发送的消息
        groupid: 1
      }

      //发送消息
      this.send_socket_message(JSON.stringify(msgJson));
    })

  },
  send_socket_message: function(msg) {
    //socket_open，连接打开的回调后才会为true，然后才能发送消息
    if (this.data.socket_open) {
      wx.sendSocketMessage({
        data: msg
      })
    }
  }
})