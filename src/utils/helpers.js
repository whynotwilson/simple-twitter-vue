import axios from "axios";
import Swal from "sweetalert2";

// const baseURL = "http://localhost:3000/";
const baseURL = "https://simple-twitter-project-api.herokuapp.com/";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // 如果 token 存在的話，則帶入到 headers 當中
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export const apiHelper = axiosInstance;

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

export const DeleteConfirm = Swal.mixin({
  title: "確定刪除嗎？",
  text: "刪除後無法復原",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "確定刪除！",
});

export const throttle = (fn, interval) => {
  let last = 0;

  return function() {
    let context = this;
    let args = arguments;
    let now = +new Date();

    if (now - last >= interval) {
      last = now;
      fn.apply(context, args);
    }
  };
};
