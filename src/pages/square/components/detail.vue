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
  <view v-if="info._id">
    <Comment ref="commentRef" :id="info._id" />
  </view>
  <view class="footer">
    <view class="input">
      <!-- <uni-easyinput
        class="input"
        type="text"
        placeholder="说点什么..."
        placeholderStyle=" font-size:12px"
        @focus="toggle"
      /> -->
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
      <view @click="toggle">
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

  <uni-popup ref="popup" background-color="#fff" @change="popupChange">
    <view class="popup-content">
      <uni-easyinput
        :focus="popupShow"
        @focus="onFocus"
        @blur="onBlur"
        v-model="comment"
        type="textarea"
        placeholder="说点什么..."
        placeholderStyle=" font-size:12px"
      />
      <view class="btn" @click="handleComment">发送</view>
    </view>
  </uni-popup>
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
      popupShow: false,
      inputBottom: 0,
      keyboardHeight: 0,
      safeAreaBottom: 0,
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
  mounted() {
    // 监听键盘高度变化
    uni.onKeyboardHeightChange((res) => {
      this.keyboardHeight = res.height;
      // iOS 安全区域适配（需真机调试）
      if (uni.getSystemInfoSync().platform === 'ios') {
        this.safeAreaBottom = plus.navigator.getSafeAreaInsets().deviceBottom;
      }
    });
  },
  methods: {
    toggle(type) {
      this.$refs.popup.open('bottom');
      this.$nextTick(() => {
        this.popupShow = true; // 下一帧触发弹窗输入框焦点
      });
    },
    popupChange(e) {
      if (!e.show) {
        this.popupShow = false;
      }
    },
    onFocus() {
      // 动态计算输入框位置（键盘高度 - 安全区域）
      this.inputBottom = `${this.keyboardHeight - this.safeAreaBottom}px`;
    },
    onBlur() {
      this.inputBottom = '0';
    },
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
    async handleComment() {
      const num = 1;
      await this.$api.comment.create({
        content: this.comment,
        dynamicId: this.info._id,
      });
      await this.$api.dynamic.updateComments(this.info._id, 1);
      uni.showToast('评论成功');
      this.$refs.popup.close();
      this.info.commentCount += num;
      this.$refs.commentRef.getComments();
    },
    change(e) {
      this.current = e.detail.current;
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'variables';
@use 'mixins';

.partner_detail {
  position: relative;
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
  :deep(.uni-easyinput__content) {
    font-size: 12px;
    padding: 0 !important;
    border-radius: 40px !important;
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

.popup-content {
  padding: 20px;
  background-color: #fff;
  .btn {
    float: right;
    @include mixins.btn;
    width: 80px;
    font-size: 12px;
    background-color: variables.$primary-color;
    color: #fff;
  }
}
</style>
