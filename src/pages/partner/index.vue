<template>
  <view class="content">
    <button>我要发起拼车</button>
    <button>我要加入拼车</button>
    <input type="text" placeholder="请输入拼车目的地" @input="input" />
    <button>搜索</button>
    <view class="car-list">
      <view class="car-item" v-for="item in 10" :key="item">
        <view class="car-info">
          <view class="car-info-left">
            <view class="car-info-left-top">
              <view class="car-info-left-top-name">张三</view>
              <view class="car-info-left-top-phone">123456789</view>
            </view>
            <view class="car-info-left-bottom">2021-01-01 12:00</view>
          </view>
          <view class="car-info-right">
            <view class="car-info-right-top">起点：北京</view>
            <view class="car-info-right-bottom">终点：上海</view>
          </view>
        </view>
        <view class="car-action">
          <button>加入拼车</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {
    input(e) {
      console.log("输入内容：", e);
    },
    iconClick(type) {
      uni.showToast({
        title: `点击了${type === "prefix" ? "左侧" : "右侧"}的图标`,
        icon: "none",
      });
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
