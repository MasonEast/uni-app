<template>
  <view class="content">
    <uni-badge text="1"></uni-badge>
    <uni-badge text="2" type="success" @click="bindClick"></uni-badge>
    <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
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
