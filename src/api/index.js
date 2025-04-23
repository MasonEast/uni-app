// api/index.js
import { get, post, put, del } from "@/utils/request";

export default {
  // 用户相关
  user: {
    login: (data) => post("/user/login", data),
    getInfo: () => get("/user/info"),
    updateInfo: (data) => put("/user/info", data),
  },

  // 商品相关
  product: {
    list: (params) => get("/product/list", { params }),
    detail: (id) => get(`/product/detail/${id}`),
    create: (data) => post("/product/create", data),
  },

  // 订单相关
  order: {
    create: (data) => post("/order/create", data),
    list: (params) => get("/order/list", { params }),
    cancel: (id) => del(`/order/cancel/${id}`),
  },
};
