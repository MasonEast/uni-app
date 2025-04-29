<template>
  <view class="square">
    <scroll-view class="classify_box" scroll-x>
      <view class="classify">
        <view
          v-for="(item, index) in classifyList"
          :key="index"
          :class="['item', currentIndex === item.value ? 'active' : '']"
          @click="switchClassify(item.value)"
        >
          {{ item.text }}
        </view>
      </view>
    </scroll-view>

    <view class="waterfall-container">
      <view
        class="waterfall-item"
        v-for="(item, index) in list"
        :key="index"
        @click="goDetail(item)"
      >
        <image class="img" :src="item.images[0]" mode="widthFix"></image>
        <view class="title">{{ item.title }}</view>
        <view class="info">
          <view class="user">
            <img class="avatar" :src="item.authorInfo?.avatarUrl" alt="" />
            <view class="name">{{ item.authorInfo?.nickname }}</view>
          </view>
          <view class="like">
            <i class="iconfont icon-yanjing1"></i>
            <view class="num">{{ item.viewCount || 0 }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      title: "Hello",
      currentIndex: -1, // 默认选中第一个
      classifyList: [{ text: "全部", value: -1 }], // 分类列表
      list: [],
      filterList: [],
    };
  },

  async onLoad() {
    const res = await this.$api.dict.getDictOptions("dynamicType");
    this.classifyList = this.classifyList.concat(res);
  },

  onShow() {
    console.log("首页显示 - 请求数据");
    this.loadData();
  },

  methods: {
    async loadData() {
      console.log("页面加载");
      const res = await this.$api.dynamic.list();

      this.list = res.dynamics;
      this.originalList = res.dynamics; // 保存原始数据列表
    },
    switchClassify(value) {
      this.currentIndex = value;
      this.list = this.originalList.filter((item) => {
        if (value == -1) {
          return true; // 全部分类
        }
        return item.type == value;
      });
    },
    goDetail(item) {
      this.$api.dynamic.updateViews(item._id); // 更新浏览量
      uni.navigateTo({
        url: `/pages/square/components/detail?id=${item._id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "variables";
@use "mixins";

.square {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
  .classify_box {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    white-space: nowrap;
    background-color: #fff;
    font-size: 12px;
    .classify {
      display: inline-block;
      background-color: #fff;
      padding: 12px;
      .item {
        margin-right: 10px;
        display: inline-block;
        color: #999;
      }
      .active {
        font-weight: bold;
        color: #56e0e0;
        padding: 0 5px;
        border-bottom: 3px solid #56e0e0;
      }
    }
  }

  .waterfall-container {
    column-count: 2; /* 分成两列 */
    column-gap: 10px; /* 列间距 */
    padding: 10px;
    margin-top: 40px;
  }

  .waterfall-item {
    break-inside: avoid; /* 防止元素被分割到不同列 */
    margin-bottom: 10px;
    padding: 10px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    .img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
      padding: 10px;
      box-sizing: border-box;
    }
    .info {
      box-sizing: border-box;
      font-size: 12px;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px 10px 10px;
      .user {
        display: flex;
        align-items: center;
        .avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 5px;
        }
        .name {
          margin-right: 10px;
        }
      }

      .like {
        display: flex;
        font-size: 12px;
        color: #999;
        .num {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
