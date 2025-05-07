// utils/request.js

// 基础路径
const BASE_URL = "http://192.168.110.78:3000/api";

// 请求拦截器
const requestInterceptor = (config) => {
  // 可以在这里添加 token 等全局参数
  const token = uni.getStorageSync("token");
  console.log("token", token, config.header);
  if (token) {
    config.header = config.header || {};
    config.header["Authorization"] = `Bearer ${token}`;
  }

  // 显示加载中
  if (config.showLoading !== false) {
    uni.showLoading({
      title: "加载中...",
      mask: true,
    });
  }

  return config;
};

// 响应拦截器
const responseInterceptor = (response, config) => {
  // 隐藏加载中
  if (config.showLoading !== false) {
    uni.hideLoading();
  }

  // 处理响应数据
  const res = response.data;

  // 这里根据你的后端返回结构进行调整
  if (res.code !== 200) {
    // 可以在这里处理特定的错误码
    if (res.code === 401) {
      // token 过期处理
      uni.showToast({
        title: "登录已过期，请重新登录",
        icon: "none",
      });
      // 跳转到登录页
      uni.navigateTo({
        url: "/pages/login/login",
      });
      return Promise.reject(new Error("登录已过期"));
    }

    // 其他错误
    uni.showToast({
      title: res.message || "请求失败",
      icon: "none",
    });
    return Promise.reject(new Error(res.message || "Error"));
  }

  return res.data;
};

// 错误拦截器
const errorInterceptor = (error, config) => {
  // 隐藏加载中
  if (config.showLoading !== false) {
    uni.hideLoading();
  }

  // 处理错误
  let errMsg = "请求失败";
  if (error.errMsg) {
    errMsg = error.errMsg.includes("timeout") ? "请求超时" : "网络错误";
  }

  uni.showToast({
    title: errMsg,
    icon: "none",
  });

  return Promise.reject(error);
};

// 封装请求方法
const request = (options) => {
  // 合并配置
  const config = {
    url: options.url,
    method: options.method || "GET",
    data: options.data || {},
    header: options.header || {},
    timeout: options.timeout || 10000,
    showLoading: options.showLoading !== false, // 默认显示loading
    ...options,
  };

  // 处理完整URL
  if (!options.url.startsWith("http")) {
    config.url = BASE_URL + options.url;
  }

  // 请求拦截
  requestInterceptor(config);

  // 发起请求
  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success: (res) => {
        try {
          const data = responseInterceptor(res, config);
          resolve(data);
        } catch (err) {
          reject(err);
        }
      },
      fail: (err) => {
        errorInterceptor(err, config);
        reject(err);
      },
      complete: () => {
        // 可以在这里添加全局完成处理
      },
    });
  });
};

// 导出常用方法
export const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "GET",
    data,
    ...options,
  });
};

export const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "POST",
    data,
    ...options,
  });
};

export const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "PUT",
    data,
    ...options,
  });
};

export const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: "DELETE",
    data,
    ...options,
  });
};

export const upload = (url, file = {}, formData = {}) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${BASE_URL}${url}`,
      filePath: file.path, // 文件临时路径
      name: "file", // 后端接收的字段名
      formData, // 附加参数
      header: {
        "Content-Type": "multipart/form-data",
      },
      success: (res) => {
        if (res.code === 200) {
          // 尝试解析返回数据（通常后端返回JSON字符串）
          try {
            console.log(res.data);
            resolve(JSON.parse(res.data));
            uni.showToast({ title: "上传成功" });
          } catch (e) {
            resolve(res.data);
          }
        } else {
          uni.showToast({ title: "上传失败" });
          reject(new Error(`上传失败: ${res.errMsg}`));
        }
      },
      fail: (err) => {
        reject(new Error(`网络错误: ${err.errMsg}`));
      },
    });
  });
};

export const uploadBatch = (url, files = [], formData = {}) => {
  const uploadTasks = files.map((file, index) => {
    console.log(url, file, formData, "------upload");

    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: `${BASE_URL}${url}`,
        filePath: file.path,
        name: "file",
        success: resolve,
        fail: reject,
      });
    });
  });

  return Promise.all(uploadTasks)
    .then((results) => {
      console.log("所有文件上传成功", results);
      return results.map((item) => JSON.parse(item.data));
    })
    .catch((err) => {
      console.error("部分文件上传失败", err);
    });
};

export default {
  request,
  get,
  post,
  put,
  delete: del,
  upload,
  uploadBatch,
};
