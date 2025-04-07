<template>
  <view class="partner_detail">
    <view class="user">
      <image class="img" src="@/static/png/a-car5.png" />
      <view>风五岁</view>
    </view>
    <view> 这个周六，想去逛街，看看春季的衣服，一起吃饭，看电影，求组队 </view>
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

<style lang="scss" scoped>
.partner_detail {
  .user {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
