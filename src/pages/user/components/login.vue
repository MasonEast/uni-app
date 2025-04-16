<template>
  <view class="login_detail">
    <image
      class="bg-image"
      src="@/static/img/login_bg.jpg"
      mode="aspectFill"
    ></image>
    <view>
      <image
        class="logo-image"
        src="@/static/img/logo.png"
        mode="widthFix"
        style="mix-blend-mode: multiply"
      ></image>
    </view>
    <view class="content">
      <button
        class="btn"
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneNumber"
      >
        手机号登录
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
    async onGetPhoneNumber(e) {
      if (e.detail.errMsg === "getPhoneNumber:ok") {
        // 获取到加密数据
        const { encryptedData, iv } = e.detail;

        // 获取当前登录的code（可能需要）
        const loginRes = await uni.login({
          provider: "weixin",
        });
        const code = loginRes.code;

        // 发送到服务器解密
        try {
          const token = uni.getStorageSync("token");
          const res = await uni.request({
            url: "https://your-koa-server.com/api/get-phone-number",
            method: "POST",
            data: { encryptedData, iv, code },
            header: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (res[1].statusCode === 200) {
            const phoneNumber = res[1].data.phoneNumber;
            console.log("解密后的手机号:", phoneNumber);

            // 保存手机号
            uni.setStorageSync("phoneNumber", phoneNumber);

            // 可以更新服务器上的用户信息
            this.updateUserPhoneNumber(phoneNumber);
          }
        } catch (error) {
          console.error("获取手机号失败:", error);
        }
      } else {
        // 用户拒绝或失败
        uni.showToast({
          title: "获取手机号失败",
          icon: "none",
        });
      }
    },

    async updateUserPhoneNumber(phoneNumber) {
      // 实现更新逻辑...
    },
  },
};
</script>

<style lang="scss" scoped>
@use "variables";
@use "mixins";

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
