import { createSSRApp } from "vue";
import App from "./App.vue";

import uView from "uview-ui";

export function createApp() {
  const app = createSSRApp(App);
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
