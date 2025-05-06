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
      <!-- <view class="item time">
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
      </view> -->
    </view>
    <view class="card publisher">
      <view class="user">
        <image class="img" :src="info.authorInfo?.avatarUrl" />
        <view class="content">
          <view class="name">{{ info.authorInfo?.nickname }}</view>
          <view class="intro">{{
            info.authorInfo?.intro || '该用户暂无介绍'
          }}</view>
        </view>
      </view>
      <view class="contact">
        <img class="img" src="@/static/png/weixin.png" />
        <view class="name">微信</view>
      </view>
    </view>
    <view class="card activity_intro">
      <!-- <view class="title">活动介绍</view> -->
      <view class="activity_content">
        {{ info.content }}
      </view>
    </view>
  </view>
  <Comment />
  <view class="footer">
    <view class="input">
      <uni-easyinput
        class="input"
        v-model="comment"
        type="text"
        placeholder="说点什么..."
        placeholderStyle=" font-size:12px"
      />
    </view>
    <view class="icons">
      <view @click="handleOpt('like')">
        <uni-icons v-if="!islike" type="hand-up" size="22"></uni-icons>
        <uni-icons
          v-else
          type="hand-up-filled"
          color="#ff5a5f"
          size="22"
        ></uni-icons>
        <view class="text">{{ info.likeCount || 0 }}</view>
      </view>
      <view>
        <uni-icons type="chat" size="22"></uni-icons>
        <view class="text">{{ info.commentCount || 0 }}</view>
      </view>
      <view @click="handleOpt('collect')">
        <uni-icons v-if="!isCollect" type="star" size="22"></uni-icons>
        <uni-icons
          v-else
          type="star-filled"
          color="#ff5a5f"
          size="22"
        ></uni-icons>
        <view class="text">{{ info.collectCount || 0 }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import Comment from '@/components/comment.vue';

export default {
  components: {
    Comment,
  },
  data() {
    return {
      current: 0,
      info: {},
      registered: false,
      comment: '',
      islike: false,
      isCollect: false,
    };
  },
  async onLoad(options) {
    console.log('options', options);
    this.info = await this.$api.dynamic.detail(options.id);
    const userInfo = await this.$api.user.getInfo();
    console.log('userInfo', userInfo, options.id);
    if (userInfo.likes.findIndex((item) => item === options.id) > -1) {
      this.islike = true;
    }
    if (userInfo.collects.findIndex((item) => item === options.id) > -1) {
      this.isCollect = true;
    }
  },
  methods: {
    handleOpt(type) {
      if (type == 'like') {
        const num = this.islike ? -1 : 1;
        this.$api.dynamic.updateLikes(this.info._id, num);
        this.info.likeCount += num;
        this.islike = !this.islike;
      }
      if (type == 'collect') {
        const num = this.isCollect ? -1 : 1;
        this.$api.dynamic.updateCollects(this.info._id, num);
        this.info.collectCount += num;
        this.isCollect = !this.isCollect;
      }
    },
    async handleRegister() {
      if (this.registered) {
        uni.showToast({
          title: '已报名',
          icon: 'none',
        });
        return;
      }
      await this.$api.dynamic.register({ id: this.info._id });
      uni.showToast({
        title: '报名成功',
        icon: 'none',
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
@use 'variables';

.partner_detail {
  width: 100%;
  height: 100%;
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
    // padding-bottom: 60px;
    // margin-bottom: 100px !important;
    .title {
      font-size: 16px;
      color: #999;
      margin: 8px;
    }
    .content {
      font-size: 14px;
      color: #333;
      margin: 10px 8px 10px 8px;
    }
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 10;
  padding: 0 20px;
  box-sizing: border-box;
  .input {
    width: 50%;
  }
  .icons {
    width: 50%;
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 5px;
    .text {
      font-size: 12px;
    }
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
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: inherit;
    filter: blur(30px);
    z-index: 1;
  }
  .swiper-img {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }
}
:deep(.uni-easyinput__content) {
  font-size: 12px;
  padding: 0 !important;
  border-radius: 40px !important;
}
</style>
