<!-- components/CustomTabBar.vue -->
<template>
  <view>12345</view>
  <view class="tabbar">
    <view
      v-for="(item, index) in list"
      :key="index"
      :class="['tabbar-item', { active: currentPage === item.pagePath }]"
      @click="switchTab(item)"
    >
      <i :class="['iconfont', `icon-${item.icon}`]"></i>
      <text class="tabbar-label">{{ item.text }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
    currentPage: {
      type: String,
      required: true,
    },
  },
  methods: {
    switchTab(item) {
      if (this.currentPage !== item.pagePath) {
        this.$emit("tabchange", item.pagePath);
      }
    },
  },
};
</script>

<style>
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
