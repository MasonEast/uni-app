<template>
  <view class="user">
    <view class="navigationBar">
      <img @click="goSet" class="img" src="@/static/png/shezhi.png" alt="" />
    </view>
    <view class="header">
      <view class="card">
        <view class="img-box">
          <img class="img" src="/static/img/1.jpg" alt="" />
          <view class="desc">
            <view class="title">东方石匠</view>
            <view class="id">ID: 123456</view>
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

    <!-- 在登录页面添加获取用户信息的按钮 -->
    <button open-type="getUserInfo" @getuserinfo="onGetUserInfo">
      获取用户信息
    </button>
    <button @click="login">登录/注册</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      title: "Hello",
    };
  },
  onLoad() {
    // 在uni-app的页面或组件中
    uni.login({
      provider: "weixin",
      success: async (loginRes) => {
        // 获取到code
        const code = loginRes.code;
        console.log(loginRes, "----code");
        // 将code发送到你的Koa后端
        try {
          const res = await uni.request({
            url: "http://localhost:3000/api/wx-login",
            method: "POST",
            data: { code },
            header: {
              "Content-Type": "application/json",
            },
          });
          console.log(res, "--------res");
          // 处理登录结果
          if (res[1].statusCode === 200) {
            // 登录成功，保存token等
            const { token, userInfo } = res[1].data;
            uni.setStorageSync("token", token);
            uni.setStorageSync("userInfo", userInfo);

            // 跳转到首页或其他页面
            uni.reLaunch({
              url: "/pages/index/index",
            });
          }
        } catch (error) {
          console.error("登录失败:", error);
        }
      },
      fail: (err) => {
        console.error("微信登录失败:", err);
      },
    });
  },
  methods: {
    login() {
      uni.navigateTo({
        url: `/pages/user/components/login`,
      });
    },

    onGetUserInfo(e) {
      if (e.detail.userInfo) {
        // 用户允许授权
        const userInfo = e.detail.userInfo;
        console.log("用户信息:", userInfo);

        // 保存到本地
        uni.setStorageSync("userInfo", userInfo);

        // 发送到服务器
        this.sendUserInfoToServer(userInfo);
      } else {
        // 用户拒绝授权
        uni.showToast({
          title: "您拒绝了授权",
          icon: "none",
        });
      }
    },

    async sendUserInfoToServer(userInfo) {
      try {
        const token = uni.getStorageSync("token");
        const res = await uni.request({
          url: "http://localhost:3000/api/update-user-info",
          method: "POST",
          data: { userInfo },
          header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res[1].statusCode === 200) {
          uni.showToast({
            title: "信息更新成功",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("更新用户信息失败:", error);
      }
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
