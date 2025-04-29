<template>
  <view class="home">
    <view class="header">
      <view class="header_content">
        <view class="hot">
          <img class="hot_img" src="@/static/png/hot.png" alt="" />
          <view class="hot_item" v-for="(item, index) in hotList" :key="index">
            <view>{{ index + 1 }}</view>
            <img class="hot_item_img" :src="item.img" alt="" />
            <view class="hot_item_name">{{ item.name }}</view>
            <view class="hot_item_num">{{ item.hot }}</view>
            <img class="hot_item_hot" src="@/static/png/hot1.png" alt="" />
          </view>
        </view>
        <view class="moment">
          <view class="moment_header">
            <view>
              <view class="header_title">活动时刻</view>
              <view class="header_tip">分享美好瞬间</view>
            </view>
            <img class="header_img" src="@/static/png/xiangji.png" alt="" />
          </view>
          <view class="moment_imgs">
            <image
              class="moment_img"
              v-for="(img, index) in momentList"
              :key="index"
              :src="img"
            />
          </view>
        </view>
      </view>
      <view class="header_content">
        <view class="group">
          <view class="header_title">活动分队</view>
          <view class="header_tip">覆盖整个小区 | 共1000+群成员</view>
          <image
            class="participant_avatar"
            v-for="(img, index) in momentList"
            :key="index"
            :src="img"
          />
          <view class="btn">开聊 Go</view>
          <img class="chat_img" src="@/static/png/liaotian.png" alt="" />
          <img class="happy_img" src="@/static/png/kaixin.png" alt="" />
        </view>
        <view class="hole">
          <view class="header_title">便民信息</view>
          <view class="header_tip">方便你我他</view>
          <img class="img" src="@/static/png/gonggaozhidu.png" alt="" />
        </view>
        <view class="hall">
          <view class="header_title">吃瓜现场</view>
          <view class="header_tip">吃瓜群众在哪里？</view>
          <img class="img" src="@/static/png/chigua.png" alt="" />
        </view>
      </view>
    </view>
    <!-- <uni-swiper-dot
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
    </uni-swiper-dot> -->

    <!-- <uni-grid class="icons" :column="4" :showBorder="false" :square="false">
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
    </uni-grid> -->

    <scroll-view
      class="classify_box"
      scroll-x
      :show-scrollbar="false"
      :scroll-with-animation="true"
    >
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

    <scroll-view scroll-y>
      <view
        class="scroll_item"
        v-for="(item, index) in activityList"
        :key="index"
        @click="goItemDetail(item)"
      >
        <view class="scroll_title"> {{ item.title }} </view>
        <view class="scroll_content">
          <view class="scroll_user">
            <image class="avatar" :src="item.authorInfo?.avatarUrl" />
            <view class="name">{{ item.authorInfo?.nickname }}</view>
            <view class="intro">{{ item.intro }}</view>
            <view class="classify">{{ item.classify }}</view>
          </view>
          <view class="scroll_time">
            <uni-tag
              :text="item.status || '进行中'"
              custom-style="background-color: #56e0e0; border-color: #56e0e0; color: #fff; font-size: 10px; padding: 1px 3px;"
            >
            </uni-tag>
            <!-- <view class="time"> {{ item.datetimerange.join(" ~ ") }} </view> -->
            <view class="time">
              <uni-dateformat
                :date="+item.datetimerange[0]"
                :threshold="[0, 0]"
                format="yyyy-MM-dd hh:mm"
              />
              ~
              <uni-dateformat
                :date="+item.datetimerange[1]"
                :threshold="[0, 0]"
                format="yyyy-MM-dd hh:mm"
              />
            </view>
            <view> {{ item.place }} </view>
          </view>
        </view>
        <view class="img_group">
          <image
            class="scroll_img"
            v-for="(img, index) in item.images.slice(0, 3)"
            :key="index"
            :src="img"
          />
        </view>
        <view class="participants">
          <view v-if="item.registers.length > 0" class="participants_group">
            <image
              class="participant_avatar"
              v-for="(register, index) in item.registers.slice(0, 4)"
              :key="index"
              :src="register.avatarUrl"
            />
            <view class="participant_num"
              >{{ item.registers.length }} 人想去</view
            >
          </view>
          <view v-else></view>
          <view class="participant_btn">上车</view>
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
      currentIndex: -1, // 默认选中第一个
      classifyList: [
        {
          value: -1,
          text: "全部",
        },
      ], // 分类列表
      hotList: [
        {
          name: "代买菜",
          hot: 998,
          img: "/static/png/maicai.png",
        },
        {
          name: "娃娃接送",
          hot: 857,
          img: "/static/png/kanhuxiaohaifuwu.png",
        },
        {
          name: "公园野营",
          hot: 668,
          img: "/static/png/gongyuan.png",
        },
      ],
      momentList: [
        "/static/img/1.jpg",
        "/static/img/1.jpg",
        "/static/img/1.jpg",
        "/static/img/1.jpg",
      ],
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
        {
          time: "2024-05-23 14:00",
          place: "小区东门口",
          title: "找逛街搭子啦",
          user: {
            name: "梅超风",
            intro: "健身达人",
            classify: "# 徒步",
            avatar: "/static/img/1.jpg",
          },
          imgs: ["/static/img/1.jpg", "/static/img/2.jpg", "/static/img/3.jpg"],
        },
        {
          time: "2024-05-23 14:00",
          place: "小区东门口",
          title: "周末去绿道骑行",
          user: {
            name: "梅超风",
            intro: "健身达人",
            classify: "# 徒步",
            avatar: "/static/img/1.jpg",
          },
          imgs: ["/static/img/1.jpg", "/static/img/2.jpg", "/static/img/3.jpg"],
        },
        {
          time: "2024-05-23 14:00",
          place: "书房幼儿园",
          title: "求个好邻居帮忙接下娃娃，有偿~",
          user: {
            name: "梅超风",
            intro: "健身达人",
            classify: "# 徒步",
            avatar: "/static/img/1.jpg",
          },
          imgs: ["/static/img/1.jpg", "/static/img/2.jpg", "/static/img/3.jpg"],
        },
      ],
      activityList: [],
      originalActivityList: [], // 原始数据列表
    };
  },

  async onLoad() {
    const res = await this.$api.dict.getDictOptions("activityType");
    this.classifyList = this.classifyList.concat(res);
  },

  onShow() {
    console.log("首页显示 - 请求数据");
    this.loadData();
  },

  // async mounted() {
  //   const list = await this.$api.activity.list("activity/list");
  //   console.log(list, "---------list");
  // },

  methods: {
    async loadData() {
      console.log("页面加载");
      const res = await this.$api.activity.list("activity/list");
      console.log(res, "---------list");
      this.activityList = res.posts;
      this.originalActivityList = res.posts; // 保存原始数据列表
    },
    handleTabChange(pagePath) {
      this.currentPage = pagePath;
      uni.switchTab({
        url: pagePath,
      });
    },
    switchClassify(value) {
      this.currentIndex = value;
      this.activityList = this.originalActivityList.filter((item) => {
        if (value == -1) {
          return true; // 全部分类
        }
        return item.type == value;
      });
    },
    goDetail(type) {
      uni.navigateTo({
        url: `/pages/${type}/index`,
      });
    },
    goItemDetail(item) {
      console.log("跳转到详情页", item);
      uni.navigateTo({
        url: `/pages/index/components/activityDetail?id=${item._id}`,
      });
    },
    change(e) {
      this.current = e.detail.current;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "variables";
@use "mixins";

.home {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  box-sizing: border-box;
  .header {
    height: 300px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    // background-color: #56e0e0;
    background-color: #ccffff;
    .header_content {
      width: 100%;
    }
    .hot {
      height: 140px;
      background-color: variables.$pure-bgc;
      margin: 10px;
      padding: 10px;
      border-radius: 10px;
      .hot_img {
        width: 50%;
        height: 30px;
        // margin-top: 10px;
        margin-bottom: 10px;
      }
      .hot_item {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        font-size: 12px;
        font-weight: 500;
        .hot_item_img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-left: 5px;
        }
        .hot_item_name {
          width: 72px;
          color: #333;
          line-height: 30px;
        }
        .hot_item_num {
          color: #999;
        }
        .hot_item_hot {
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
      }
    }
    .moment {
      height: 90px;
      background-color: variables.$pure-bgc;
      margin: 0 10px 10px 10px;
      padding: 10px;
      border-radius: 10px;
      .moment_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .header_title {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .header_tip {
          font-size: 10px;
          color: #999;
        }
        .header_img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transform: rotate(45deg);
        }
      }
      .moment_imgs {
        display: flex;
        justify-content: space-between;
        .moment_img {
          width: 24%;
          height: 40px;
          border-radius: 6px;
        }
      }
    }
    .group {
      position: relative;
      height: 110px;
      background-color: variables.$pure-bgc;
      margin: 10px 10px 10px 0;
      padding: 10px;
      border-radius: 10px;
      .header_title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .header_tip {
        font-size: 10px;
        color: #999;
        margin-bottom: 5px;
      }
      .participant_avatar {
        width: 15px;
        height: 15px;
        border: 1px solid #fff;
        border-radius: 50%;
        margin-right: -5px;
        margin-bottom: 15px;
      }
      .btn {
        @include mixins.flex-center;
        color: #56e0e0;
        background-color: #000;
        font-size: 12px;
        font-weight: 500;
        width: 60px;
        height: 25px;
        border-radius: 25px;
      }
      .chat_img {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 70px;
        bottom: 9px;
      }
      .happy_img {
        width: 30px;
        height: 30px;
        position: absolute;
        right: 32px;
        bottom: 32px;
      }
    }
    .hall {
      height: 45px;
      background-color: variables.$pure-bgc;
      margin: 0 10px 10px 0;
      padding: 10px;
      border-radius: 10px;
      position: relative;
      .header_title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .header_tip {
        font-size: 10px;
        color: #999;
        margin-bottom: 5px;
      }
      .img {
        width: 45px;
        height: 40px;
        position: absolute;
        right: 30px;
        bottom: 12px;
      }
    }
    .hole {
      height: 45px;
      background-color: variables.$pure-bgc;
      margin: 0 10px 10px 0;
      padding: 10px;
      border-radius: 10px;
      position: relative;
      .header_title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .header_tip {
        font-size: 10px;
        color: #999;
        margin-bottom: 5px;
      }
      .img {
        width: 45px;
        height: 40px;
        position: absolute;
        right: 30px;
        bottom: 12px;
      }
    }
  }
  // background-color: #3cc51f;
  .icons {
    width: 100%;
    background-color: #fff;
    padding-bottom: 20px;
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
  .classify_box {
    width: 100%;
    white-space: nowrap;
    background-color: #fff;
    ::-webkit-scrollbar {
      display: none;
    }
    // font-size: 12px;
    // font-weight: 500;
    .classify {
      // height: 30px;
      display: inline-block;
      // align-items: center;
      background-color: #fff;
      padding: 10px;
      .item {
        margin-right: 10px;
        display: inline-block;
        color: #999;
        font-size: 14px;
      }
      .active {
        // font-weight: bold;
        color: #56e0e0;
        padding: 0 5px;
        border-bottom: 3px solid #56e0e0;
      }
    }
  }
}

.scroll_item {
  // color: #fff;
  background-color: #fff;
  // margin: 0 10px 20px 10px;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  .scroll_title {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .scroll_user {
    margin-bottom: 10px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    .name {
      margin: 0 10px;
    }
    .intro {
      color: #999;
      margin-right: 5px;
    }
    .classify {
      color: #999;
    }
  }
  .scroll_time {
    font-size: 12px;
    display: flex;
    margin-bottom: 10px;
    // justify-content: space-between;
    .time {
      margin: 0 10px 0 5px;
    }
  }
  .img_group {
    display: flex;
    // justify-content: space-between;
    // &:after {
    //   content: "";
    //   width: 33%; /* 与元素等宽 */
    //   height: 0; /* 隐藏高度 */
    // }
    .scroll_img {
      width: 33%;
      height: 100px;
      margin-right: calc(1% / 2);
    }
  }

  .participants {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    font-size: 10px;
    color: #999;
    .participants_group {
      display: flex;
      align-items: center;
      .participant_avatar {
        width: 20px;
        height: 20px;
        border: 1px solid #fff;
        border-radius: 50%;
        margin-right: -10px;
      }
      .participant_num {
        margin-left: 15px;
      }
    }

    .participant_btn {
      @include mixins.flex-center;
      color: #56e0e0;
      background-color: #000;
      font-size: 14px;
      font-weight: bold;
      width: 60px;
      height: 25px;
      border-radius: 25px;
    }
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
  @include mixins.flex-center;
  flex: 1;
  flex-direction: column;
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
