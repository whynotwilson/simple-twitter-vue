import { apiHelper } from "./../utils/helpers.js";

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`);
  },
  getTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`);
  },
  getFriends({ userId }) {
    return apiHelper.get(`/users/${userId}/friends`);
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, {});
  },
  deleteLike({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}/like`);
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`);
  },
  putUser({ formData, userId }) {
    return apiHelper.put(`/users/${userId}`, formData);
  },
  getMyFollowings() {
    return apiHelper.get(`/get_current_user_followings`);
  },
  deleteFollowShip({ followerId, followingId }) {
    return apiHelper.delete(`/followships/${followingId}`, {
      data: {
        followerId,
      },
    });
  },
  addFollowing({ followingId }) {
    return apiHelper.post(`/followships`, { followingId });
  },
};
