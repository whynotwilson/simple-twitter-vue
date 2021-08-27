import { apiHelper } from "./../utils/helpers.js";
const getToken = () => localStorage.getItem('token')

export default {
  getTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteLike({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}/like`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getMyFollowings() {
    return apiHelper.get(`/get_current_user_followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFollowShip({ followerId, followingId }) {
    return apiHelper.delete(`/followships/${followingId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      data: {
        followerId,
      },
    })
  },
  addFollowing({ followingId }) {
    return apiHelper.post(`/followships`, { followingId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}