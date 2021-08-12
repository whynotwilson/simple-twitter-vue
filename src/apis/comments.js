import { apiHelper } from "../utils/helpers.js";
const getToken = () => localStorage.getItem('token')

export default {
  create({ tweetId, comment }) {
    return apiHelper.post(`/replies`, { tweetId, comment }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}