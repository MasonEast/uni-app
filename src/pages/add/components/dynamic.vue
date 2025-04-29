<template>
  <view class="content">
    <view class="classic card">
      <view>*动态分类</view>
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
      <!-- <view class="button_group">
        <view class="button">
          <uni-icons class="icon" type="images" size="15"></uni-icons>
          从图片库选择
        </view>
        <view class="button">
          <uni-icons class="icon" type="plusempty" size="15"></uni-icons>
          使用简介模版
        </view>
      </view> -->

      <view class="title">
        <uni-file-picker
          limit="9"
          title="最多选择9张图片"
          v-model="imgList"
          @select="handleImgSelect"
          @success="handleUploadSuccess"
          @delete="handleImgDelete"
          :auto-upload="false"
        ></uni-file-picker>
      </view>
      <view class="title_input">
        <uni-easyinput
          v-model="title"
          :inputBorder="false"
          :styles="styles"
          :placeholderStyle="placeholderStyle"
          placeholder="标题（20字内）"
          @input="input"
        ></uni-easyinput>
      </view>
      <view>
        <uni-easyinput
          type="textarea"
          v-model="content"
          :inputBorder="false"
          placeholder="请描述内容~"
        ></uni-easyinput>
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
      @click="handleSubmit"
    >
      <view>发布</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: "",
      title: "",
      content: "",
      location: "",
      time: "",
      weixin: "",
      phone: "",
      datetimerange: [],
      imgList: [],
      tempFiles: [],
      range: [],
      styles: {
        color: "#56e0e0",
      },
      placeholderStyle: "color:#56e0e0; font-size:18px",
    };
  },
  watch: {
    datetimerange(newval) {
      console.log(
        "范围选:",
        newval,
        this.datetimerange,
        new Date(newval[0]).getTime()
      );
      this.$refs.timePopup.close();
    },
  },
  onLoad() {},
  async mounted() {
    this.range = await this.$api.dict.getDictOptions("dynamicType");
  },
  methods: {
    openLocation() {
      this.$refs.locationPopup.open();
    },
    openTime() {
      this.$refs.timePopup.open();
    },
    change(e) {
      this.type = e;
    },
    change1(type) {
      uni.showToast({
        title: `点击了${type === "prefix" ? "左侧" : "右侧"}的图标`,
        icon: "none",
      });
    },
    async handleImgSelect(e) {
      console.log("选择的文件", e);
      this.tempFiles.push(...e.tempFiles);
      // await this.$api.upload.uploadImg(e.tempFiles[0].file);
    },
    handleImgDelete(e) {
      console.log("删除的文件", e);
      this.tempFiles.splice(e.index, 1);
    },

    handleUploadSuccess(e) {
      console.log("上传成功", e);
      // e.tempFilePaths 是上传后的临时路径（H5端可能不同）
      const tempFilePath = e.tempFilePaths[0]; // 取第一个文件
      this.fileList.push({
        name: e.tempFiles[0].name,
        url: tempFilePath,
      });
    },
    async handleSubmit() {
      console.log(
        "提交",
        // this.title,
        // this.content,
        // this.location,
        // this.datetimerange,
        // this.type,
        this.tempFiles
      );
      const imgs = await this.$api.upload.uploadBatch(this.tempFiles);
      console.log("上传成功", imgs);

      const res = await this.$api.dynamic.create({
        title: this.title,
        content: this.content,
        location: this.location,
        datetimerange: [
          new Date(this.datetimerange[0]).getTime(),
          new Date(this.datetimerange[1]).getTime(),
        ],
        type: this.type,
        weixin: this.weixin,
        phone: this.phone,
        images: imgs.map((item) => item.data?.[0]),
      });
      console.log("发布成功", res);
      uni.showToast({
        title: "发布成功",
        icon: "success",
      });
      uni.switchTab({ url: "/pages/index/index" });
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

  border: 1px solid #f5f7fa;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 10px;
}
.location_input {
  display: flex;
  align-items: center;
  margin-left: 8px;
}
.color_g {
  font-size: 10px;
  color: #999;
  .icon {
    margin-right: 5px;
  }
  .icon_right {
    margin-left: 5px;
    margin-top: 3px;
  }
}

.submit {
  display: flex;
  align-items: center;
  height: 80px;
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
.title_input :deep(.uni-easyinput__content-input) {
  font-size: 18px;
  padding: 0 !important;
}

.location_input :deep(.uni-easyinput__content-input) {
  font-size: 10px;
  padding: 0 !important;
}

.time_popup {
  height: 170px;
}
</style>
