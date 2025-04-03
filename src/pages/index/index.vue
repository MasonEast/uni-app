<template>
  <view class="content">
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
          <image class="img_icon" src="@/static/png/a-car3.png" />
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
        url: "/pages/car/index",
      });
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

<style lang="scss">
.content {
  width: 100%;
  // background-color: #3cc51f;
  .icons {
    width: 100%;
    height: 300px;
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

.tabbar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx; /* 根据设计稿调整高度 */
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  padding: 0 20rpx;
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
  font-size: 40rpx; /* 图标大小 */
}

.tabbar-label {
  font-size: 24rpx;
  margin-top: 4rpx;
}
</style>
