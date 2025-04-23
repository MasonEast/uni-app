import { createSSRApp } from "vue";
import App from "./App.vue";
import api from "./api";
import uView from "uview-ui";

export function createApp() {
  const app = createSSRApp(App);

  app.config.globalProperties.$api = api;

  // 如果需要同时在 uni 对象上挂载（客户端）
  if (typeof window !== "undefined") {
    uni.$api = api;
  }
  //   app.use(uView);
  return {
    app,
  };
}
// import { createApp } from "vue";
// import App from "./App.vue";
// import uView from "uview-ui";

// const app = createApp(App);

// // 使用 uView 插件（确保 uView 有 Vue 3 版本）
// // app.use(uView);

// // 挂载应用（如果需要 SSR，可能需要不同的挂载方式）
// app.mount("#app");
