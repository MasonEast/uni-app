<template>
  <view class="content">
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
    <uni-grid class="icons" :column="4" :showBorder="false" :square="false">
      <uni-grid-item>
        <view class="icon">
          <image class="img_icon" src="@/static/png/task.png" />
          <view>任务大厅</view>
        </view>
      </uni-grid-item>
      <uni-grid-item>
        <view class="icon">
          <image class="img_icon" src="@/static/png/168-boy-2.png" />
          <view>娃娃接送</view>
        </view>
      </uni-grid-item>
      <uni-grid-item>
        <view class="icon" @click="goDetail('car')">
          <image class="img_icon" src="@/static/png/a-car5.png" />
          <view>上班拼车</view>
        </view>
      </uni-grid-item>
      <uni-grid-item>
        <view class="icon">
          <image class="img_icon" src="@/static/png/gonggaozhidu.png" />
          <view>便民信息</view>
        </view>
      </uni-grid-item>
      <uni-grid-item>
        <view class="icon">
          <image class="img_icon" src="@/static/png/couples-therapy.png" />
          <view>相亲角</view>
        </view>
      </uni-grid-item>
      <uni-grid-item>
        <view class="icon">
          <image class="img_icon" src="@/static/png/xianzhigongxiang.png" />
          <view>闲置互换</view>
        </view>
      </uni-grid-item>
    </uni-grid>
    <scroll-view scroll-y>
      <view
        class="scroll_item"
        v-for="(item, index) in items"
        :key="index"
        @click="goItemDetail('partner')"
      >
        <view class="title"> {{ item.title }} </view>
        <view class="content">
          <view> {{ item.time }} </view>
          <view> {{ item.place }} </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      title: "Hello",
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
      current: 0,
      mode: "default",
      items: [
        { time: "2024-05-23", place: "吾悦广场", title: "找逛街搭子啦" },
        { time: "2024-05-23", place: "吾悦广场", title: "找逛街搭子啦" },
        { time: "2024-05-23", place: "吾悦广场", title: "找逛街搭子啦" },
        { time: "2024-05-23", place: "吾悦广场", title: "找逛街搭子啦" },
        { time: "2024-05-23", place: "吾悦广场", title: "找逛街搭子啦" },
        { time: "2024-05-23", place: "吾悦广场", title: "找逛街搭子啦" },
      ],
    };
  },
  onLoad() {
    this.currentPage = "/" + options.__route__.split("/").pop();
  },
  methods: {
    handleTabChange(pagePath) {
      this.currentPage = pagePath;
      uni.switchTab({
        url: pagePath,
      });
    },
    goDetail(type) {
      uni.navigateTo({
        url: `/pages/${type}/index`,
      });
    },
    goItemDetail(type) {
      uni.navigateTo({
        url: `/pages/${type}/components/detail`,
      });
    },
    change(e) {
      this.current = e.detail.current;
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

<style lang="scss">
.content {
  width: 100%;
  // background-color: #3cc51f;
  .icons {
    width: 100%;
    // height: 300px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .custom_grid {
      width: 100%;
    }

    .icon {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img_icon {
        width: 40px;
        height: 40px;
        margin-top: 20px;
        margin-bottom: 5px;
      }
    }
  }
}

.scroll_item {
  color: #fff;
  background-color: #ccc;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  .title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .content {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
}

.tabbar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px; /* 根据设计稿调整高度 */
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #7a7e83;
}

.tabbar-item.active {
  color: #3cc51f; /* 选中颜色 */
}

.iconfont {
  font-size: 40px; /* 图标大小 */
}

.tabbar-label {
  font-size: 24px;
  margin-top: 4px;
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
