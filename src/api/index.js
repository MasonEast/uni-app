// api/index.js
import { get, post, put, del, upload, uploadBatch } from "@/utils/request";

export default {
  // 用户相关
  user: {
    login: (data) => post("/user/login", data),
    getInfo: () => get("/user/info"),
    updateInfo: (data) => put("/user/info", data),
  },

  dict: {
    getDictOptions: (dictName) => get(`/dict/${dictName}`),
  },

  // 商品相关
  activity: {
    list: (params) => get("/activity/list", { params }),
    detail: (id) => get(`/activity/detail/${id}`),
    create: (data) => post("/activity/create", data),
  },

  // 订单相关
  order: {
    create: (data) => post("/order/create", data),
    list: (params) => get("/order/list", { params }),
    cancel: (id) => del(`/order/cancel/${id}`),
  },

  upload: {
    uploadFile: (files, formData) => upload("/upload/file", files, formData),
    uploadBatch: (files, formData) =>
      uploadBatch("/upload/file", files, formData),
  },
};
