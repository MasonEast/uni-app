<template>
  <view class="content">
    <uni-section
      title="关闭按钮"
      subTitle="使用 show-close 属性,可关闭通知"
      type="line"
    >
      <uni-notice-bar
        show-close
        single
        text="HBuilderX 1.0正式发布！uni-app实现里程碑突破实现里程碑突破！"
      />
    </uni-section>
    <uni-section
      title="默认"
      subTitle="使用 focus 属性自动获取输入框焦点"
      type="line"
      padding
    >
      <uni-easyinput
        errorMessage
        v-model="value"
        focus
        placeholder="请输入内容"
        @input="input"
      ></uni-easyinput>
    </uni-section>
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
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
