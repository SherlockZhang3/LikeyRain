//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    scale: 18, // 缩放级别，默认18，数值在0~18之间
    latitude: 0, // 给个默认值
    longitude: 0 // 给个默认值
  },
  onLoad: function (options) {
    // 1.页面初始化 options为页面跳转所带来的参数
    // 2.调用wx.getLocation系统API,获取并设置当前位置经纬度
    wx.getLocation({
      type: "gcj02", // 坐标系类型
      // 获取经纬度成功回调
      success: (res) => { // es6 箭头函数，可以解绑当前作用域的this指向，使得下面的this可以绑定到Page对象
        this.setData({  // 为data对象里定义的经纬度默认值设置成获取到的真实经纬度，这样就可以在地图上显示我们的真实位置
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    });
    //3.设置地图控件的位置及大小，通过设备宽高定位
    wx.getSystemInfo({   // 系统API,获取系统信息，比如设备宽高
      success: function(res) {
        this.setData({
          controls:[
            {
              id: 1, // 给控件定义唯一id
              iconPath: '/images/location.png', // 控件图标
              position: { // 控件位置
                left: 20, // 单位px
                top: res.windowHeight - 80, // 根据设备高度设置top值，可以做到在不同设备上效果一致
                width: 50, // 控件宽度/px
                height: 50 // 控件高度/px
              },
              clickable: true // 是否可点击，默认为true,可点击
            },
            {
              id: 2,
              iconPath: '/images/use.png',
              position: {
                left: res.windowWidth / 2 - 45,
                top: res.windowHeight - 100,
                width: 90,
                height: 90
              },
              clickable: true
            },
            {
              id: 3,
              iconPath: '/images/warn.png',
              position: {
                left: res.windowWidth - 70,
                top: res.windowHeight - 80,
                width: 50,
                height: 50
              },
              clickable: true
            },
            {
              id: 4,
              iconPath: '/images/marker.png',
              position: {
                left: res.windowWidth / 2 - 11,
                top: res.windowHeight / 2 - 45,
                width: 22,
                height: 45
              },
              clickable: false
            },
            {
              id: 5,
              iconPath: '/images/avatar.png',
              position: {
                left: res.windowWidth - 68,
                top: res.windowHeight - 155,
                width: 45,
                height: 45
              },
              clickable: true
            }
          ]
          })
      },
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 1.创建地图上下文移动当前位置到地图中心
    this.mapCtx=wx.createMapContext("LikeyMap");//地图组件的id
    this.movetoposition()
  },
  movetoposition:function(){
    this.mapCtx.moveToLocation();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function () {
    return {
      title: 'LikeyRain',
      path: '/pages/index/index',
      imageUrl: '/images/fenxiang.png',
    }
  }
})
