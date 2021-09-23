import { apiHelper } from "./../utils/helpers.js";

export default {
  get() {
    return apiHelper.get(`/tweets`);
  },
  create({ tweetText, tags }) {
    return apiHelper.post(`/tweets`, { tweetText, tags });
  },
  delete({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}`);
  },
  put({ description, tweetId }) {
    return apiHelper.put(`/tweets/${tweetId}`, { description });
  },
};
