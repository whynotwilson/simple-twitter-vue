import { apiHelper } from "./../utils/helpers.js";
const getToken = () => localStorage.getItem('token')

export default {
  get() {
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  create({ tweetText }) {
    return apiHelper.post(`/tweets`, { tweetText }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}