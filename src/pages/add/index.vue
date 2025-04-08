<template>
  <view class="content">
    <view class="classic card">
      <view>*活动分类</view>
      <uni-data-select
        class="select"
        :clear="false"
        :model="value"
        :localdata="range"
        @change="change"
        placeholder=""
      ></uni-data-select>
    </view>
    <view class="card">
      <view class="button_group">
        <view class="button">
          <uni-icons class="icon" type="images" size="15"></uni-icons>
          从图片库选择
        </view>
        <view class="button">
          <uni-icons class="icon" type="plusempty" size="15"></uni-icons>
          使用简介模版
        </view>
      </view>

      <view class="title">
        <uni-file-picker limit="9" title="最多选择9张图片"></uni-file-picker>
      </view>
      <view>
        <uni-easyinput
          v-model="title"
          :inputBorder="false"
          :styles="styles"
          :placeholderStyle="placeholderStyle"
          placeholder="给活动一个响亮的标题（20字内）"
          @input="input"
        ></uni-easyinput>
      </view>
      <view>
        <uni-easyinput
          type="textarea"
          v-model="value"
          :inputBorder="false"
          placeholder="请描述活动内容、亮点，吸引大家参加吧~"
        ></uni-easyinput>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      value: "",
      range: [
        { value: 0, text: "找搭子" },
        { value: 1, text: "接送娃娃" },
        { value: 2, text: "上班拼车" },
      ],
      styles: {
        color: "#2979FF",
      },
      placeholderStyle: "color:#2979FF; font-size:18px",
    };
  },
  onLoad() {},
  methods: {
    change(e) {
      console.log("输入内容：", e);
    },
    change1(type) {
      uni.showToast({
        title: `点击了${type === "prefix" ? "左侧" : "右侧"}的图标`,
        icon: "none",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #f5f7fa;
  box-sizing: border-box;
  .card {
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;
    .button_group {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 80%;
    }
    .button {
      width: 150px;
      height: 30px;
      font-size: 12px;
      border: 1px solid #f5f7fa;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      margin-right: 10px;
      .icon {
        margin-right: 5px;
      }
    }
  }
  .classic {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .select {
      width: 60%;
      margin-left: 20px;
    }
  }
  .title {
    margin: 20px 0;
  }
}

:deep(.uni-select) {
  border: none;
}
:deep(.uni-easyinput__content-input) {
  font-size: 18px;
  padding: 0 !important;
}
</style>
