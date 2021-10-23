import { apiHelper } from "./../utils/helpers.js";

export default {
  getMessages({ chattingUserId }) {
    return apiHelper.get(`/messages/${chattingUserId}`);
  },
};
