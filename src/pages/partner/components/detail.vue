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
    <view class="card">
      <view class="title"> 我是活动的标题 </view>
      <view class="item time">
        <uni-icons
          class="icon"
          type="notification-filled"
          size="20"
        ></uni-icons>
        <view>2025.04.09 19:00 - 2025.04.09 19:00</view>
      </view>
      <view class="item location">
        <uni-icons class="icon" type="location-filled" size="20"></uni-icons>
        <view>小区东门口</view>
      </view>
    </view>
    <view class="card publisher">
      <view class="user">
        <image class="img" src="@/static/png/a-car5.png" />
        <view class="content">
          <view class="name">梅超风</view>
          <view class="intro">我擅长九阴白骨爪</view>
        </view>
      </view>
      <view class="contact">
        <img class="img" src="@/static/png/xiangqin.png" />
        <view class="name">微信</view>
      </view>
    </view>
    <view class="card activity_intro">
      <view class="title">活动介绍</view>
      <view class="content">
        这个周六，想去逛街，看看春季的衣服，一起吃饭，看电影，求组队,这个周六，想去逛街，看看春季的衣服，一起吃饭，看电影，求组队,这个周六，想去逛街，看看春季的衣服，一起吃饭，看电影，求组队，这个周六，想去逛街，看看春季的衣服，一起吃饭，看电影，求组队
      </view>
    </view>
  </view>
  <view class="submit">
    <!-- <view class="btn btn_draft" @click="openLocation">
      <view>存草稿</view>
    </view> -->
    <view
      class="btn btn_submit"
      style="width: calc(100% - 125px)"
      @click="openLocation"
    >
      <view>我要报名</view>
    </view>
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
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
  .card {
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 6px;
    box-sizing: border-box;
    .item {
      display: flex;
      align-items: center;
      // justify-content: space-between;
    }
    .icon {
      margin-right: 5px;
      color: #999;
    }
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    margin: 8px;
  }
  .time {
    margin: 8px;
  }
  .location {
    margin: 8px;
  }
  .publisher {
    box-sizing: border-box;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      width: 150px;
      .content {
        display: flex;
        flex-direction: column;
        // align-items: center;
        // justify-content: center;
        margin-left: 10px;
        .name {
          // margin-left: 5px;
        }
        .intro {
          font-size: 10px;
          color: #999;
        }
      }
    }
    .contact {
      display: flex;
      align-items: center;
      border: 1px solid #f5f7fa;
      height: 25px;
      border-radius: 25px;
      padding: 3px;
      .img {
        width: 20px;
        height: 20px;
      }
      .name {
        font-size: 10px;
      }
    }

    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .activity_intro {
    .title {
      font-size: 16px;
      color: #999;
      margin: 8px;
    }
    .content {
      font-size: 14px;
      color: #333;
      margin: 10px 8px;
    }
  }
}

.submit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 1000;

  .btn {
    width: 120px;
    height: 25px;
    font-size: 10px;
    border: 1px solid #f5f7fa;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .btn_draft {
    width: 100px;
    height: 30px;
    font-size: 16px;
  }
  .btn_submit {
    color: #fff;
    background-color: #2979ff;
    font-size: 16px;
    height: 30px;
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
