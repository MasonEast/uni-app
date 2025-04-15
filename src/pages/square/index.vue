<template>
  <view class="square">
    <scroll-view class="classify_box" scroll-x>
      <view class="classify">
        <view
          v-for="(item, index) in classifyList"
          :key="index"
          :class="['item', currentIndex === index ? 'active' : '']"
          @click="switchClassify(index)"
        >
          {{ item.label }}
        </view>
      </view>
    </scroll-view>

    <view class="waterfall-container">
      <view
        class="waterfall-item"
        v-for="(item, index) in filterList"
        :key="index"
      >
        <image class="img" :src="item.img" mode="widthFix"></image>
        <view class="title">{{ item.title }}</view>
        <view class="info">
          <view class="user">
            <img class="avatar" :src="item.avatar" alt="" />
            <view class="name">{{ item.name }}</view>
          </view>
          <view class="like">
            <i class="iconfont icon-yanjing1"></i>
            <view class="num">{{ item.like }}</view>
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
      currentIndex: 0, // 默认选中第一个
      classifyList: [
        { label: "全部", value: "all" },
        { label: "便民信息", value: "info" },
        { label: "二手交易", value: "secondhand" },
        { label: "人力市场", value: "human" },
      ], // 分类列表
      list: [
        {
          img: "/static/img/1.jpg",
          title: "运动不能停，学了三节课的腹式呼吸",
          avatar: "/static/img/1.jpg",
          name: "心爱的姑娘",
          like: 0,
        },
        {
          img: "/static/img/3.jpg",
          title: "运动不能停，学了三节课的腹式呼吸",
          avatar: "/static/img/1.jpg",
          name: "心爱的姑娘",
          like: 0,
        },
        {
          img: "/static/img/bianmin.png",
          title: "收废品电话",
          avatar: "/static/img/1.jpg",
          name: "心爱的姑娘",
          like: 0,
          classify: "info",
        },
        {
          img: "/static/img/5.jpg",
          title: "运动不能停，学了三节课的腹式呼吸",
          avatar: "/static/img/1.jpg",
          name: "心爱的姑娘",
          like: 0,
        },
        {
          img: "/static/img/2.jpg",
          title: "运动不能停，学了三节课的腹式呼吸",
          avatar: "/static/img/1.jpg",
          name: "心爱的姑娘",
          like: 0,
        },
        {
          img: "/static/img/3.jpg",
          title: "运动不能停，学了三节课的腹式呼吸",
          avatar: "/static/img/1.jpg",
          name: "心爱的姑娘",
          like: 0,
        },
        {
          img: "/static/img/4.jpg",
          title: "运动不能停，学了三节课的腹式呼吸",
          avatar: "/static/img/1.jpg",
          name: "心爱的姑娘",
          like: 0,
        },
        {
          img: "/static/img/5.jpg",
          title: "运动不能停，学了三节课的腹式呼吸",
          avatar: "/static/img/1.jpg",
          name: "心爱的姑娘",
          like: 0,
        },
      ],
      filterList: [],
    };
  },
  onLoad() {
    this.filterList = this.list;
  },

  methods: {
    switchClassify(index) {
      this.currentIndex = index;
      this.filterList = this.list.filter((item) => {
        if (index === 0) return true;
        return item.classify === this.classifyList[index].value;
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
    position: fixed;
    top: 0;
    width: 100%;
    white-space: nowrap;
    background-color: #fff;
    font-size: 12px;
    .classify {
      width: 100%;
      // height: 30px;
      display: inline-block;
      // align-items: center;
      background-color: #fff;
      padding: 6px;
      overflow-y: scroll;
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
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
