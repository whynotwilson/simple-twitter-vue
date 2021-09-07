import { apiHelper } from "./../utils/helpers.js";

export default {
  get() {
    return apiHelper.get(`/tweets`);
  },
  create({ tweetText }) {
    return apiHelper.post(`/tweets`, { tweetText });
  },
  delete({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}`);
  },
  put({ description, tweetId }) {
    return apiHelper.put(`/tweets/${tweetId}`, { description });
  },
};
