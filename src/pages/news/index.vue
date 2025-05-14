<template>
  <view class="set_detail">
    <view
      class="custom-navbar"
      :style="{
        height: navBarHeight + 'px',
        paddingTop: statusBarHeight + 'px',
      }"
    >
      <!-- 标题文字 -->
      <view
        class="title-text"
        :style="{
          lineHeight: menuButton?.height + 'px',
          marginRight: capsuleRight + 'px',
          width: '50px',
        }"
      >
        消息
      </view>
      <img class="clear_img" src="@/static/png/qingchu.png" alt="" />
    </view>
    <view class="content">
      <view class="new_item">
        <image class="img" src="@/static/png/hudongtongzhi.png" alt="" />
        <view class="text">
          <text class="title">互动通知</text>
          <text class="content">您有一条新的消息</text>
        </view>
      </view>
      <view class="new_item">
        <image
          class="img"
          style="background-color: rgb(253, 225.6, 225.6)"
          src="@/static/png/zizhutuiguang.png"
          alt=""
        />
        <view class="text">
          <text class="title">活动助手</text>
          <text class="content">还未收到活动消息哦~</text>
        </view>
      </view>
      <view class="new_item">
        <image
          class="img"
          style="background-color: rgb(216.8, 235.6, 255)"
          src="@/static/png/xitongtongzhi-.png"
          alt=""
        />
        <view class="text">
          <text class="title">系统通知</text>
          <text class="content">欢迎来到近邻</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      title: 'Hello',
      statusBarHeight: 0,
      navBarHeight: 0,
      capsuleRight: 0,
    };
  },
  onLoad() {
    const systemInfo = uni.getSystemInfoSync();
    const menuButton = uni.getMenuButtonBoundingClientRect();
    this.statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
    this.navBarHeight =
      (menuButton.top - systemInfo.statusBarHeight) * 2 + menuButton.height; // 导航栏总高度
    this.capsuleRight = systemInfo.windowWidth - menuButton.right; // 胶囊右侧边距
  },
  methods: {
    logout() {
      this.$refs.alertDialog.open();
    },
    dialogConfirm() {
      this.$refs.alertDialog.close();
    },
    dialogClose() {
      this.$refs.alertDialog.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'variables';
@use 'mixins';

.set_detail {
  width: 100%;
  height: 100vh;
  //   background-color: #f5f7fa;
  box-sizing: border-box;
  padding: 20px;
  .header {
    @include mixins.header;
  }
  .custom-navbar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .title-text {
    // flex: 1;
    text-align: center;
    font-size: 32rpx;
    /* 通过计算保证文字与胶囊垂直居中 */
    transform: translateY(2px); /* iOS 微调 */
  }
  .clear_img {
    width: 20px;
    height: 20px;
    margin-top: 4px;
  }

  .new_item {
    display: flex;
    margin-bottom: 20px;
    .img {
      width: 35px;
      height: 35px;
      padding: 4px;
      border-radius: 50%;
      background-color: rgb(224.6, 242.8, 215.6);
    }
    .text {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      .title {
        font-size: 14px;
      }
      .content {
        margin-top: 5px;
        font-size: 10px;
        color: #999;
      }
    }
  }
}
</style>
