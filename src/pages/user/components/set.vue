<template>
  <view class="set_detail">
    <view class="card">
      <view>关于我们</view>
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
      value: "",
      title: "Hello",
    };
  },
  onLoad() {},
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
@use "variables";
@use "mixins";

.set_detail {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
  .card {
    @include mixins.card;
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
