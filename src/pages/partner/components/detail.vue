<template>
  <view class="partner_detail">
    <uni-swiper-dot
      :info="info"
      :current="current"
      field="content"
      :mode="mode"
    >
      <swiper class="swiper-box" @change="change">
        <swiper-item v-for="(item, index) in info" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index">
            {{ item.content }}
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
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
      current: 0,
      mode: "default",
      info: [
        {
          content: "内容 A",
        },
        {
          content: "内容 B",
        },
        {
          content: "内容 C",
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    change(e) {
      this.current = e.detail.current;
    },
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

.swiper-box {
  height: 200px;
}

.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #fff;
}

.swiper-item0 {
  background-color: #cee1fd;
}

.swiper-item1 {
  background-color: #b2cef7;
}

.swiper-item2 {
  background-color: #cee1fd;
}
</style>
