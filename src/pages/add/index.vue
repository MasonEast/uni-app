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
      <view class="button_group" style="width: 100%">
        <view class="button color_g" style="width: 85px" @click="openLocation">
          <uni-icons class="icon" type="location-filled" size="15"></uni-icons>
          <view>选择地点</view>
          <uni-icons class="icon icon_right" type="right" size="15"></uni-icons>
        </view>
        <view
          class="button color_g"
          :style="{ width: datetimerange.length ? '260px' : '110px' }"
          @click="openTime"
        >
          <uni-icons
            class="icon"
            type="notification-filled"
            size="15"
          ></uni-icons>
          <view>{{
            datetimerange.length ? datetimerange.join(" ~ ") : "选择活动时间"
          }}</view>
          <uni-icons class="icon icon_right" type="right" size="15"></uni-icons>
        </view>
      </view>
      <uni-popup
        ref="locationPopup"
        type="bottom"
        border-radius="10px 10px 0 0"
      >
        <view class="page-body">
          <view class="page-section page-section-gap">
            <map
              style="width: 100%; height: 300px"
              :latitude="latitude"
              :longitude="longitude"
              :markers="covers"
            >
            </map>
          </view>
        </view>
      </uni-popup>
      <uni-popup ref="timePopup" type="bottom" border-radius="10px 10px 0 0">
        <view class="example-body">
          <uni-datetime-picker
            v-model="datetimerange"
            type="datetimerange"
            rangeSeparator="至"
          />
        </view>
      </uni-popup>
    </view>
    <view class="card_title">发起人联系方式</view>
    <view class="card">
      <view class="contact_item">
        <view class="contact_name">微信号</view>
        <uni-easyinput
          v-model="value"
          :inputBorder="false"
          placeholder="请输入微信号"
        />
      </view>
      <view class="contact_item">
        <view class="contact_name">手机号</view>
        <uni-easyinput
          v-model="value"
          :inputBorder="false"
          placeholder="请输入手机号"
        />
      </view>
    </view>
  </view>
  <view class="button_group submit">
    <view class="button btn_draft" @click="openLocation">
      <view>存草稿</view>
    </view>
    <view
      class="button btn_submit"
      style="width: calc(100% - 125px)"
      @click="openLocation"
    >
      <view>发布</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      value: "",
      datetimerange: [],
      range: [
        { value: 0, text: "找搭子" },
        { value: 1, text: "接送娃娃" },
        { value: 2, text: "上班拼车" },
      ],
      styles: {
        color: "#56e0e0",
      },
      placeholderStyle: "color:#56e0e0; font-size:18px",
    };
  },
  watch: {
    datetimerange(newval) {
      console.log("范围选:", newval, this.datetimerange);
      this.$refs.timePopup.close();
    },
  },
  onLoad() {},
  methods: {
    openLocation() {
      this.$refs.locationPopup.open();
    },
    openTime() {
      this.$refs.timePopup.open();
    },
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
@use "variables";

.content {
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: #f5f7fa;
  box-sizing: border-box;
  .card_title {
    color: #999;
    font-size: 12px;
    margin: 10px 0;
  }
  .card {
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #fff;

    .contact_item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      height: 40px;
      .contact_name {
        margin-right: 20px;
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

.button_group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 265px;
}
.button {
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
  .icon {
    margin-right: 5px;
  }
}
.color_g {
  color: #999;
  .icon_right {
    margin-left: 5px;
    margin-top: 3px;
  }
}

.submit {
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 1000;

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

:deep(.uni-select) {
  border: none;
}
:deep(.uni-easyinput__content-input) {
  font-size: 18px;
  padding: 0 !important;
}
</style>
