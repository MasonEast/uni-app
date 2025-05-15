<template>
  <view class="news_detail">
    <view class="card">
      <view class="title">
        <text>欢迎来到近邻</text>
        <text class="time">2025-12-13 08:44</text>
      </view>
      <view class="content">
        近邻是一款基于地理位置的社交应用，旨在帮助用户发现附近的商家、活动和优惠信息。通过近邻，您可以轻松地找到附近的美食、购物、娱乐等资源，并与附近的用户互动交流。
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
    };
  },
  onLoad(options) {
    console.log(options, '------');
  },
  methods: {
    login() {
      uni.navigateTo({
        url: `/pages/user/components/login`,
      });
    },
    logout() {
      this.$refs.alertDialog.open();
    },
    dialogConfirm() {
      this.$refs.alertDialog.close();
      uni.clearStorageSync('token');
      uni.clearStorageSync('userInfo');
      uni.showToast({
        title: '退出登录成功',
        icon: 'none',
      });
      this.login();
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

.news_detail {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
  .card {
    @include mixins.card;
    .title {
      font-size: 16px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .time {
        font-size: 12px;
        color: #999;
      }
    }
    .content {
      font-size: 12px;
      color: #999;
    }
  }
  .btn {
    @include mixins.btn;
    height: 45px;
    color: #999;
    border-radius: 10px;
    margin-top: 20px;
  }
}
</style>
