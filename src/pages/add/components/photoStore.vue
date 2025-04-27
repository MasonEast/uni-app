<template>
  <view class="photo_list">
    <!-- <uni-transition
        ref="ani"
        custom-class="transition"
        :mode-class="['fade', 'slide-top']"
        :show="true"
      >
        <text class="text">示例元素</text>
      </uni-transition> -->
    <view class="item" v-for="(item, index) in imgList" :key="index">
      <view class="title">{{ item.title }}</view>
      <view class="imgs">
        <img
          v-for="(path, imgIndex) in item.imgs"
          :key="imgIndex"
          @click="handleSelect(path)"
          :class="['img', selectImgs.includes(path) ? ' select' : '']"
          :src="path"
          alt=""
        />
      </view>
    </view>
    <view class="btn" @click="handleSubmit">确定</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: "",
      imgList: [],
      selectImgs: [],
    };
  },

  async onLoad() {
    this.imgList = await this.$api.activity.photos();
  },

  methods: {
    handleSelect(path) {
      if (this.selectImgs.includes(path)) {
        this.selectImgs.splice(this.selectImgs.indexOf(path), 1);
      } else {
        this.selectImgs.push(path);
      }
    },

    handleSubmit() {
      uni.navigateTo({
        url: `/pages/add/components/activity`,
        success: (res) => {
          res.eventChannel.emit("acceptImages", this.selectImgs);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "variables";

.photo_list {
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: #f5f7fa;
  box-sizing: border-box;

  .btn {
    width: 60%;
    height: 40px;
    background-color: #fff;
    // color: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-top: 20px;
  }
  .item {
    width: 100%;
    margin-top: 20px;
    .title {
      font-size: 10px;
      color: #999;
    }
    .imgs {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100px;
      margin-top: 5px;
      .img {
        width: 24%;
        height: 85px;
        border-radius: 10px;
      }
      .select {
        border: 2px solid #007aff;
        box-sizing: border-box;
      }
    }
  }
}
</style>
