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
  delete({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  put({ description, tweetId }) {
    return apiHelper.put(`/tweets/${tweetId}`, { description }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}