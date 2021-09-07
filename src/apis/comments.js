import { apiHelper } from "./../utils/helpers.js";

export default {
  create({ tweetId, comment }) {
    return apiHelper.post(`/replies`, { tweetId, comment });
  },
};
