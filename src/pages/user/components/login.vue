<template>
  <uni-icons class="back_icon" type="left" size="30" @click="back"></uni-icons>
  <view class="login_detail">
    <image class="bg-image" src="@/static/img/1.jpg" mode="aspectFill"></image>
    <view>
      <image
        class="logo-image"
        src="@/static/img/logo.png"
        mode="widthFix"
        style="mix-blend-mode: multiply"
      ></image>
    </view>
    <view class="content">
      <!-- <button
        class="btn"
        open-type="getPhoneNumber"
        @getphonenumber="handleGetPhoneNumber"
      >
        手机号登录
      </button> -->
      <button class="btn" open-type="getUserInfo" @getuserinfo="onGetUserInfo">
        微信登录
      </button>
      <view class="agreement">登录即代表同意《用户协议》、《隐私政策》</view>
    </view>
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
  onLoad() {},
  methods: {
    back() {
      uni.switchTab({
        url: `/pages/user/user`,
      });
    },
    async handleGetPhoneNumber(e) {
      if (e.detail.errMsg !== "getPhoneNumber:ok") {
        uni.showToast({
          title: "获取手机号失败",
          icon: "none",
        });
        return;
      }

      try {
        // 获取微信登录code
        const loginRes = await uni.login({ provider: "weixin" });

        // 发送加密数据到服务器
        const res = await uni.request({
          url: "http://localhost:3000/api/phone-login",
          method: "POST",
          data: {
            code: loginRes.code, // 微信登录code
            encryptedData: e.detail.encryptedData, // 加密数据
            iv: e.detail.iv, // 加密算法的初始向量
          },
          header: {
            "Content-Type": "application/json",
          },
        });

        if (res[1].statusCode === 200) {
          // 登录成功处理
          const { token, openid, userInfo } = res[1].data;
          uni.setStorageSync("token", token);
          uni.setStorageSync("openid", openid);
          uni.setStorageSync("userInfo", userInfo);

          uni.showToast({
            title: "登录成功",
            icon: "success",
          });

          // 跳转到首页
          uni.reLaunch({
            url: "/pages/index/index",
          });
        } else {
          throw new Error(res[1].data.message || "登录失败");
        }
      } catch (error) {
        console.error("手机号登录失败:", error);
        uni.showToast({
          title: error.message,
          icon: "none",
        });
      }
    },

    async onGetUserInfo(e) {
      const userInfo = e.detail.userInfo;
      if (userInfo) {
        // 用户允许授权
        console.log("用户信息:", userInfo);

        // 保存到本地
        uni.setStorageSync("userInfo", userInfo);
        // 发送到服务器
        // await this.sendUserInfoToServer(userInfo);
      } else {
        // 用户拒绝授权
        uni.showToast({
          title: "您拒绝了授权",
          icon: "none",
        });
      }

      uni.login({
        provider: "weixin",
        success: async (loginRes) => {
          // 获取到code
          const code = loginRes.code;
          console.log(loginRes, "----code");
          // 将code发送到你的Koa后端
          try {
            const res = await this.$api.user.login({ code, userInfo });
            console.log(res, "--------res");

            const { token, openid, userInfo } = res;
            uni.setStorageSync("token", token);
            uni.setStorageSync("openid", openid);
            uni.setStorageSync("userInfo", userInfo);

            // 跳转到首页或其他页面
            uni.reLaunch({
              url: "/pages/index/index",
            });
          } catch (error) {
            console.error("登录失败:", error);
          }
        },
        fail: (err) => {
          console.error("微信登录失败:", err);
        },
      });
    },

    // async onGetUserInfo(e) {
    //   if (e.detail.userInfo) {
    //     // 用户允许授权
    //     const userInfo = e.detail.userInfo;
    //     console.log("用户信息:", userInfo);

    //     // 保存到本地
    //     uni.setStorageSync("userInfo", userInfo);
    //     await this.login();
    //     // 发送到服务器
    //     await this.sendUserInfoToServer(userInfo);
    //   } else {
    //     // 用户拒绝授权
    //     uni.showToast({
    //       title: "您拒绝了授权",
    //       icon: "none",
    //     });
    //   }
    // },

    async sendUserInfoToServer(userInfo) {
      try {
        const token = uni.getStorageSync("token");
        console.log("token:--------", token);
        const res = await uni.request({
          url: "http://localhost:3000/api/update-user-info",
          method: "POST",
          data: { userInfo },
          header: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.statusCode === 200) {
          uni.showToast({
            title: "登录成功",
            icon: "success",
          });
        }
      } catch (error) {
        uni.showToast({
          title: error.errMsg || "登录失败",
          icon: "error",
        });
        console.error("登录失败:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "variables";
@use "mixins";

.back_icon {
  position: absolute;
  left: 8px;
  top: 50px;
  font-weight: bold;
}

.login_detail {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .bg-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    z-index: -1;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80px;
    .agreement {
      font-size: 12px;
      color: #999;
      margin-top: 10px;
    }
    .btn {
      @include mixins.btn;
      height: 45px;
      background-color: #56e0e0;
      border-radius: 10px;
      margin-top: 20px;
      color: #333;
      background-color: #56e0e0;
      border-radius: 45px;
      width: 265px;
    }
  }

  .logo-image {
    position: relative;
    z-index: 1;
    /* 混合模式去除白色背景 */
    mix-blend-mode: multiply;
    /* 可选：调整亮度对比度 */
    filter: brightness(1.1) contrast(1.1);
  }
}
</style>
