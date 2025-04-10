<template>
  <view class="home">
    <view class="header">
      <view class="header_content">
        <view class="hot">
          <view>上热门</view>
        </view>
        <view class="moment">
          <view>活动时刻</view>
        </view>
      </view>
      <view class="header_content">
        <view class="group">
          <view>活动分队</view>
        </view>

        <view class="hall">
          <view>活动大厅</view>
        </view>
        <view class="hole">
          <view>小区树洞</view>
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
        <view class="scroll_title"> {{ item.title }} </view>
        <view class="scroll_content">
          <view class="scroll_user">
            <image class="avatar" :src="item.user?.avatar" />
            <view class="name">{{ item.user?.name }}</view>
            <view class="intro">{{ item.user?.intro }}</view>
            <view class="classify">{{ item.user?.classify }}</view>
          </view>
          <view class="scroll_time">
            <uni-tag
              text="进行中"
              custom-style="background-color: #56e0e0; border-color: #56e0e0; color: #fff; font-size: 10px; padding: 1px 3px;"
            >
            </uni-tag>
            <view class="time"> {{ item.time }} </view>
            <view> {{ item.place }} </view>
          </view>
        </view>
        <view class="img_group">
          <image
            class="scroll_img"
            v-for="(img, index) in item.imgs"
            :key="index"
            :src="img"
          />
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

<style lang="scss" scoped>
@use "variables";
@use "mixins";

.home {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
  .header {
    height: 300px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    // background-color: #56e0e0;
    background-color: rgb(153, 255, 255, 0.5);
    .header_content {
      width: 100%;
    }
    .hot {
      height: 190px;
      background-color: variables.$pure-bgc;
      margin: 10px;
      border-radius: 10px;
    }
    .moment {
      height: 80px;
      background-color: variables.$pure-bgc;
      margin: 0 10px 10px 10px;
      border-radius: 10px;
    }
    .group {
      height: 140px;
      background-color: variables.$pure-bgc;
      margin: 10px 10px 10px 0;
      border-radius: 10px;
    }
    .hall {
      height: 60px;
      background-color: variables.$pure-bgc;
      margin: 0 10px 10px 0;
      border-radius: 10px;
    }
    .hole {
      height: 60px;
      background-color: variables.$pure-bgc;
      margin: 0 10px 10px 0;
      border-radius: 10px;
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
}

.scroll_item {
  // color: #fff;
  background-color: #fff;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    justify-content: space-between;
    .scroll_img {
      width: 33%;
      height: 100px;
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
