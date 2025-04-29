<template>
  <view class="content">
    <!-- <uni-transition
      ref="ani"
      custom-class="transition"
      :mode-class="['fade', 'slide-top']"
      :show="true"
    >
      <text class="text">示例元素</text>
    </uni-transition> -->
    <view class="btn" @click="goActivity">发布活动</view>
    <view class="btn" @click="goDynamic">发布动态</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: "",
    };
  },

  onLoad() {},

  methods: {
    goActivity() {
      uni.navigateTo({
        url: "/pages/add/components/activity",
      });
    },
    goDynamic() {
      uni.navigateTo({
        url: "/pages/add/components/dynamic",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "variables";

.content {
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: #f5f7fa;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .btn {
    width: 60%;
    height: 40px;
    background-color: #fff;
    // color: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-top: 20px;
  }
}
</style>
