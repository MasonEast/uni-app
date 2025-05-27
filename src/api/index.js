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

  // 活动相关
  activity: {
    list: (params) => get("/post/list", { params }),
    detail: (id) => get(`/post/detail/${id}`),
    create: (data) => post("/post/create", data),
    register: (data) => post("/post/register", data),
    photos: () => get("/post/photos"), // 图片库
  },

  // 动态相关
  dynamic: {
    list: (params) => get("/dynamic/list", { params }),
    detail: (id) => get(`/dynamic/detail/${id}`),
    create: (data) => post("/dynamic/create", data),
    register: (data) => post("/dynamic/register", data),
    updateViews: (id) => put(`/dynamic/views/${id}`),
    updateLikes: (id, num) => put(`/dynamic/likes/${id}?num=${num}`),
    updateComments: (id, num) => put(`/dynamic/comments/${id}?num=${num}`),
    updateCollects: (id, num) => put(`/dynamic/collects/${id}?num=${num}`),

  },

  // 消息
    message: {
    list: (params) => get("/message/list", { params }),
    markAsRead: (data) => post("/message/mark-read", data),
    markAllRead: (data) => post("/message/mark-all-read", data),
  },

    // 评论相关
  comment: {
    create: (data) => post("/comment/create", data),
    reply: (commentId, data) => post(`/comment/${commentId}/reply`, data),
    getComments: (postId) => get(`/comment/${postId}`),
  },

  upload: {
    uploadFile: (files, formData) => upload("/upload/file", files, formData),
    uploadBatch: (files, formData) =>
      uploadBatch("/upload/file", files, formData),
  },
};
