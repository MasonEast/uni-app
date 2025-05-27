<template>
  <view class="news_detail">
    <view class="card" v-for="item in data" :key="item._id">
      <view class="title">
        <text>{{ item.title }}</text>
        <uni-dateformat
          class="time"
          :date="item.createdAt"
          :threshold="[0, 0]"
          format="yyyy-MM-dd hh:mm"
        />
      </view>
      <view class="content"> {{ item.content }} </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: '',
      data: [],
    };
  },
  onLoad(options) {
    console.log(options, '------');
    const { type, data } = options;
    this.type = type;
    this.data = JSON.parse(data);
    this.$api.message.markAsRead({
      messageIds: this.data.map((item) => item._id),
    });
  },
  methods: {
    login() {
      uni.navigateTo({
        url: `/pages/user/components/login`,
      });
    },
    logout() {
      this.$refs.alertDialog.open();
    },
    dialogConfirm() {
      this.$refs.alertDialog.close();
      uni.clearStorageSync('token');
      uni.clearStorageSync('userInfo');
      uni.showToast({
        title: '退出登录成功',
        icon: 'none',
      });
      this.login();
    },
    dialogClose() {
      this.$refs.alertDialog.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@use 'variables';
@use 'mixins';

.news_detail {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  box-sizing: border-box;
  padding: 10px;
  .card {
    @include mixins.card;
    margin: 0 0 10px 0;
    height: auto;
    .title {
      font-size: 16px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .time {
        font-size: 12px;
        color: #999;
      }
    }
    .content {
      font-size: 12px;
      color: #999;
    }
  }
  .btn {
    @include mixins.btn;
    height: 45px;
    color: #999;
    border-radius: 10px;
    margin-top: 20px;
  }
}
</style>
