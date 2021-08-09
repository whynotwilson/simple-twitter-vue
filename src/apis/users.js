import { apiHelper } from "./../utils/helpers.js";
const getToken = () => localStorage.getItem('token')

export default {
  getTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}