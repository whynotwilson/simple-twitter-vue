import axios from "axios"
import Swal from "sweetalert2"

const baseURL = "http://localhost:3000/"

export const apiHelper = axios.create({
  baseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
})

export const DeleteConfirm = Swal.mixin({
  title: "確定刪除嗎？",
  text: "刪除後無法復原",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "確定刪除！",
})