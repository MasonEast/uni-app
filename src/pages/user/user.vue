<template>
  <view class="user">
    <view class="navigationBar">
      <img @click="goSet" class="img" src="@/static/png/shezhi.png" alt="" />
    </view>
    <view class="header">
      <view class="card">
        <view v-if="token" class="img-box">
          <img class="img" :src="userInfo.avatarUrl" alt="" />
          <view class="desc">
            <view class="title">{{ userInfo.nickName }}</view>
            <view class="id">ID: 123456</view>
          </view>
        </view>
        <view v-else class="img-box">
          <img class="img" src="/static/png/user.png" alt="" />
          <view class="desc">
            <view class="login" @click="login">登录/注册</view>
          </view>
        </view>
        <view class="btn-box">
          <view class="left">
            <img class="img" src="/static/png/qizhi.png" alt="" />
            <view class="text">我参与的 </view>
            <view class="tip">群/活动</view>
          </view>
          <view class="right">
            <img class="img" src="/static/nav/fabu_on.png" alt="" />
            <view class="text">我发布的 </view>
            <view class="tip">群/活动</view>
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
      token: "",
      userInfo: "",
      title: "Hello",
    };
  },
  onLoad() {
    // 在uni-app的页面或组件中
  },
  mounted() {
    this.token = uni.getStorageSync("token");
    this.userInfo = uni.getStorageSync("userInfo");
  },
  methods: {
    login() {
      uni.navigateTo({
        url: `/pages/user/components/login`,
      });
    },
    goSet() {
      uni.navigateTo({
        url: `/pages/user/components/set`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "variables";
.user {
  .navigationBar {
    background: linear-gradient(
      to bottom,
      rgb(153, 255, 255, 0.7),
      rgb(153, 255, 255, 0.5)
    );
    display: flex;
    align-items: center;
    height: 80px;
    padding: 10px;

    .img {
      margin-top: 36px;
      width: 20px;
      height: 20px;
    }
  }
  .header {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    background-color: rgb(153, 255, 255, 0.5);

    .card {
      width: 100%;
      height: 120px;
      background-color: variables.$pure-bgc;
      margin: 30px 10px 10px 10px;
      padding: 10px;
      border-radius: 10px;
      .img-box {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .img {
          width: 65px;
          height: 65px;
          border: 2px solid variables.$pure-bgc;
          border-radius: 50%;
          margin-top: -20px;
          margin-left: 12px;
          margin-bottom: 10px;
          margin-right: 20px;
        }
        .desc {
          display: flex;
          flex-direction: column;
          .title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .id {
            font-size: 10px;
            color: #999;
          }
          .login {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
          }
        }
      }
      .btn-box {
        display: flex;
        justify-content: space-around;
        .left,
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border-radius: 20px;
          padding: 10px;
          .img {
            width: 15px;
            height: 15px;
            margin-right: 5px;
          }
          .text {
            font-size: 12px;
            color: #333;
            margin-right: 5px;
          }
          .tip {
            font-size: 10px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
