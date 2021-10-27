import { apiHelper } from "./../utils/helpers.js";

export default {
  getTweets({ hashtag }) {
    return apiHelper.get(`/hashtag/${hashtag}`);
  },
};
