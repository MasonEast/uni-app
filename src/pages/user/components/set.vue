<template>
  <view class="set_detail">
    <view class="card">
      <view>希望我们能给大家带来一点帮助~</view>
    </view>
    <view @click="logout" class="btn">退出登录</view>
  </view>
  <uni-popup ref="alertDialog" type="dialog">
    <uni-popup-dialog
      type="info"
      cancelText="关闭"
      confirmText="确认"
      title="提示"
      content="确定要退出登录吗"
      @confirm="dialogConfirm"
      @close="dialogClose"
    ></uni-popup-dialog>
  </uni-popup>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      title: 'Hello',
    };
  },
  onLoad() {},
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

.set_detail {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
  padding: 20px;
  .card {
    @include mixins.card;
    margin: 0 0 20px 0;
  }
  .btn {
    @include mixins.btn;
    height: 45px;
    color: #999;
    border-radius: 10px;
    margin: 0 0 20px 0;
  }
}
</style>
