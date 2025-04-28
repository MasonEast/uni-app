<template>
  <view class="partner_detail">
    <uni-swiper-dot :info="info.images" :current="current" field="content">
      <swiper class="swiper-box" @change="change">
        <swiper-item v-for="(item, index) in info.images" :key="index">
          <view
            class="swiper-item"
            :style="{ backgroundImage: `url(${item})` }"
          >
            <img class="swiper-img" :src="item" mode="widthFix" />
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <view class="card">
      <view class="title"> {{ info.title }} </view>
      <view class="item time">
        <uni-icons
          class="icon"
          type="notification-filled"
          size="20"
        ></uni-icons>
        <view>
          <uni-dateformat
            :date="+info.datetimerange?.[0]"
            :threshold="[0, 0]"
            format="yyyy-MM-dd hh:mm"
          />
          ~
          <uni-dateformat
            :date="+info.datetimerange?.[1]"
            :threshold="[0, 0]"
            format="yyyy-MM-dd hh:mm"
          />
        </view>
      </view>
      <view class="item location">
        <uni-icons class="icon" type="location-filled" size="20"></uni-icons>
        <view>{{ info.location }}</view>
      </view>
    </view>
    <view class="card publisher">
      <view class="user">
        <image class="img" :src="info.authorInfo?.avatarUrl" />
        <view class="content">
          <view class="name">{{ info.authorInfo?.nickname }}</view>
          <view class="intro">{{
            info.authorInfo?.intro || "该用户暂无介绍"
          }}</view>
        </view>
      </view>
      <view class="contact">
        <img class="img" src="@/static/png/weixin.png" />
        <view class="name">微信</view>
      </view>
    </view>
    <view class="card activity_intro">
      <view class="title">活动介绍</view>
      <view class="activity_content">
        {{ info.content }}
      </view>
    </view>
  </view>
  <view class="submit">
    <view
      class="btn btn_submit"
      style="width: calc(100% - 125px)"
      @click="handleRegister"
    >
      <view>{{ registered ? "已报名" : "我要报名" }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      info: {},
      registered: false,
    };
  },
  async onLoad(options) {
    console.log("options", options);
    this.info = await this.$api.activity.detail(options.id);
    const openid = uni.getStorageSync("openid");
    if (this.info.registers.findIndex((item) => item.openid === openid) > -1) {
      this.registered = true;
    }
    // console.log(this.info);
  },
  methods: {
    async handleRegister() {
      if (this.registered) {
        uni.showToast({
          title: "已报名",
          icon: "none",
        });
        return;
      }
      await this.$api.activity.register({ id: this.info._id });
      uni.showToast({
        title: "报名成功",
        icon: "none",
      });

      uni.navigateBack({
        delta: 1,
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
  .activity_content {
    white-space: pre-wrap;
    padding: 20rpx;
    font-size: 14px;
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
        margin-left: 5px;
      }
    }

    .img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .activity_intro {
    margin-bottom: 60px !important;
    .title {
      font-size: 16px;
      color: #999;
      margin: 8px;
    }
    .content {
      font-size: 14px;
      color: #333;
      margin: 10px 8px 80px 8px;
    }
  }
}

.submit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
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
    background-color: variables.$primary-color;
    font-size: 16px;
    height: 30px;
  }
}

.swiper-box {
  height: 600px;
}

.swiper-item {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 600px;
  color: #fff;
  background-size: cover;

  &:before {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: inherit;
    filter: blur(15px);
    z-index: 1;
  }
  .swiper-img {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }
}

// .swiper-item0 {
//   background-color: #cee1fd;
// }

// .swiper-item1 {
//   background-color: #b2cef7;
// }

// .swiper-item2 {
//   background-color: #cee1fd;
// }
</style>
