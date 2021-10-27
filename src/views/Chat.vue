<template>
  <div
    class="
        py-4
        col-xxl-7 col-xl-7 col-lg-8 col-md-9 col-sm-10 col-12
        mx-auto
      "
  >
    <!--  Dimensions > 576px(sm) -->
    <div class="d-none d-sm-block">
      <div class="row min-height-80vh bg-white">
        <aside
          class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 padding-none border"
        >
          <div
            class="d-flex justify-content-center align-items-center border-bottom h-65px"
          >
            <span class="fs-4">{{ currentUser.name }}</span>
          </div>
          <div class="d-flex flex-column">
            <router-link
              class="chat-user"
              v-for="friend in friends"
              :key="friend.id"
              :to="{
                name: 'chat-with-user',
                params: { chattingUserId: friend.id },
              }"
              ><div>
                <div class="position-relative">
                  <img :src="friend.avatar" alt="avatar" class="avatar" />
                  <div :class="friend.isOnline ? 'online' : 'offline'">
                    <div></div>
                  </div>
                </div>
                <div class="ms-2">
                  <span class="">{{ friend.name }}</span>
                  <span v-if="friend.lastMessage" class="last-message">{{
                    friend.lastMessage
                  }}</span>
                  <span v-else class="last-message">
                    尚無聊天訊息
                  </span>
                </div>
              </div></router-link
            >
          </div>
        </aside>
        <div
          class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 padding-none border-top border-end border-bottom"
        >
          <div v-if="isChatUser" class="chat-window">
            <div>
              <span class="fs-4">{{ chattingUser.name }}</span>
            </div>
            <div>
              <div id="messageBox" v-if="!isFetchMessagesLoading">
                <div
                  v-for="message in messages"
                  :key="message.id"
                  :class="message.class"
                >
                  <div>
                    <img
                      v-if="message.class === 'received'"
                      :src="chattingUser.avatar"
                      alt="avatar"
                    />
                    <span>{{ message.message }}</span>
                  </div>
                </div>
              </div>
              <div v-else class="" style="height: calc(80vh - 127px);">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div class="chat-form">
              <form action="POST" @submit.prevent="handleSubmit">
                <textarea
                  placeholder="訊息......"
                  v-model="message"
                  @keypress="submitOnEnter"
                  @input="updateTextareaHeight"
                  class="textarea"
                  rows="1"
                ></textarea>
                <button type="submit">傳送</button>
              </form>
            </div>
          </div>
          <div
            v-else
            class="h-100 d-flex justify-content-center align-items-center"
          >
            <div class="text-center">
              <div class="mb-2">
                <i class="fab fa-3x fa-facebook-messenger"></i>
              </div>
              <h2>你的訊息</h2>
              <span>傳送訊息給朋友</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  Dimensions < 576px(sm) -->
    <div class="flex d-block d-sm-none">
      <div class="row min-height-80vh bg-white xs">
        <div v-if="isChatUser" class="chat-window">
          <div>
            <span class="fs-4">{{ chattingUser.name }}</span>
          </div>
          <div>
            <div id="messageBox" v-if="!isFetchMessagesLoading">
              <div
                v-for="message in messages"
                :key="message.id"
                :class="message.class"
              >
                <div>
                  <img
                    v-if="message.class === 'received'"
                    :src="chattingUser.avatar"
                    alt="avatar"
                  />
                  <span>{{ message.message }}</span>
                </div>
              </div>
            </div>
            <div v-else class="" style="height: calc(80vh - 127px);">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
          <div class="chat-form">
            <form action="POST" @submit.prevent="handleSubmit">
              <textarea
                placeholder="訊息......"
                v-model="message"
                @keypress="submitOnEnter"
                @input="updateTextareaHeight"
                class="textarea"
                rows="1"
              ></textarea>
              <button type="submit">傳送</button>
            </form>
          </div>
        </div>

        <!-- friends box -->
        <aside v-else class="padding-none border friends-box bg-white">
          <div
            class="d-flex justify-content-center align-items-center border h-65px"
          >
            <span class="fs-4">{{ currentUser.name }}</span>
          </div>
          <div class="d-flex flex-column">
            <router-link
              class="chat-user"
              v-for="friend in friends"
              :key="friend.id"
              :to="{
                name: 'chat-with-user',
                params: { chattingUserId: friend.id },
              }"
              ><div>
                <div class="position-relative">
                  <img :src="friend.avatar" alt="avatar" class="avatar" />
                  <div :class="friend.isOnline ? 'online' : 'offline'">
                    <div></div>
                  </div>
                </div>
                <div class="ms-2">
                  <span class="">{{ friend.name }}</span>
                  <span v-if="friend.lastMessage" class="last-message">{{
                    friend.lastMessage
                  }}</span>
                  <span v-else class="last-message">
                    尚無聊天訊息
                  </span>
                </div>
              </div></router-link
            >
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { mapState, useStore } from "vuex";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import { Toast } from "./../utils/helpers.js";
import usersAPI from "./../apis/users.js";
import messagesAPI from "./../apis/messages.js";

export default {
  name: "Chat",
  setup() {
    let isLoading = ref(false);
    let isFetchMessagesLoading = ref(false);

    const route = useRoute();
    const userId = route.params.id;

    let chattingUserId = computed(() => route.params.chattingUserId);
    let isChatUser = computed(() => (chattingUserId.value ? true : false));

    let friends = ref([]);
    let onlineUsersId = ref([]);

    let messages = ref([]);

    const updateLastMessage = (data) => {
      friends.value = friends.value.map((friend) => {
        if (friend.id === data.senderId || friend.id === data.receiverId) {
          friend.lastMessage = data.message;
        }
        return friend;
      });
    };

    const setOverflowAtTheEnd = () => {
      let messageBox = document.getElementById("messageBox");
      let messageBox2 = document.getElementById("messageBox2");

      if (messageBox !== null) {
        messageBox.scrollTop = messageBox.scrollHeight;
      }
      if (messageBox2 !== null) {
        messageBox2.scrollTop = messageBox2.scrollHeight;
      }
    };

    const updateOnlineUsersId = (data) => {
      onlineUsersId.value = data;
    };

    const updateIsOnlineInFriends = (onlineUsersId) => {
      friends.value = friends.value.map((d) => {
        return {
          ...d,
          isOnline: onlineUsersId.includes(d.id),
        };
      });
    };

    const updateMessages = async (data) => {
      messages.value.push(data);

      await nextTick();
      setOverflowAtTheEnd();
    };

    const fetchMessages = async () => {
      try {
        isFetchMessagesLoading.value = true;

        let { data } = await messagesAPI.getMessages({
          chattingUserId: chattingUserId.value,
        });

        messages.value = data.messages;

        isFetchMessagesLoading.value = false;
      } catch (error) {
        isFetchMessagesLoading.value = false;
        Toast.fire({
          icon: "error",
          title: "無法取得聊天紀錄，請稍後再試",
        });

        console.log("Error: ", error);
      }
    };

    const fetchFriends = async () => {
      try {
        isLoading.value = true;
        let { data } = await usersAPI.getFriends({ userId });
        if (onlineUsersId.value.length) {
          data = data.map((d) => {
            return {
              ...d,
              isOnline: onlineUsersId.value.includes(d.id),
            };
          });
        }
        friends.value = data;
      } catch (error) {
        isLoading.value = false;
        Toast.fire({
          icon: "error",
          title: "無法取得好友列表，請稍後再試",
        });

        console.log("Error: ", error);
      }
    };

    let chattingUser = ref({});

    const store = useStore();
    const defaultWsUrl = "ws://localhost:3000/";
    let ws = ref({});

    const wsConnect = (chattingUserId) => {
      ws.value = new WebSocket(
        defaultWsUrl + "?chattingUserId=" + chattingUserId,
        store.state.token
      );

      ws.value.onopen = () => {};

      ws.value.onclose = () => {};

      ws.value.onmessage = (event) => {
        let data = JSON.parse(event.data);
        if (data.onlineUsersId) {
          updateOnlineUsersId(data.onlineUsersId);
        }

        if (data.message) {
          if (
            Number(data.message.senderId) === Number(chattingUserId) ||
            Number(data.message.receiverId) === Number(chattingUserId)
          ) {
            data.message.class = data.status ? "sent" : "received";
            data.message.messageStatus =
              data.status === "success" ? true : false;

            updateMessages(data.message);
          }

          updateLastMessage(data.message);
        }
      };
    };

    const wsSend = (message) => {
      ws.value.send(message);
    };

    watch(chattingUserId, async (newValue) => {
      if (newValue === "undefined" || !newValue) {
        chattingUser.value = {};
        onlineUsersId.value = [];
      } else {
        let friend = friends.value.find((f) => f.id === Number(newValue));
        chattingUser.value = Object.assign({}, friend);
        if (isChatUser.value) {
          wsConnect(chattingUserId.value);
          fetchFriends();
          await fetchMessages();
          setOverflowAtTheEnd();
        }
      }
    });

    watch(onlineUsersId, (newValue) => {
      updateIsOnlineInFriends(newValue);
    });

    let message = ref("");

    const handleSubmit = () => {
      wsSend(String(message.value));
      message.value = "";
    };

    onBeforeRouteUpdate(() => {
      if (ws.value.readyState) {
        ws.value.close();
      }
    });

    onBeforeRouteLeave(() => {
      if (ws.value.readyState) {
        ws.value.close();
      }
    });

    onMounted(async () => {
      fetchFriends();
      await fetchMessages();
      setOverflowAtTheEnd();
      if (isChatUser.value) {
        wsConnect(chattingUserId.value);
      }
    });

    return {
      isFetchMessagesLoading,
      friends,
      messages,
      isChatUser,
      chattingUserId,
      chattingUser,
      message,
      handleSubmit,
      ws,
      wsSend,
      onlineUsersId,
    };
  },
  methods: {
    updateTextareaHeight() {
      let textarea = document.getElementsByClassName("textarea");
      let height = [
        textarea[0].style.height.substring(
          0,
          textarea[0].style.height.length - 2
        ),
        textarea[1].style.height.substring(
          0,
          textarea[1].style.height.length - 2
        ),
      ];
      console.log(height);
      // if (height[0] > 128) {
      //   textarea[0].style["overflow-y"] = "auto";
      // }
      // if (height[1] > 128) {
      //   textarea[1].style["overflow-y"] = "auto";
      // }

      textarea[0].style.height = "auto";
      textarea[0].style.height = textarea[0].scrollHeight + "px";

      textarea[1].style.height = "auto";
      textarea[1].style.height = textarea[1].scrollHeight + "px";
    },
    submitOnEnter(e) {
      if (e.which === 13 && !e.shiftKey) {
        e.target.form.dispatchEvent(new Event("submit", { cancelable: true }));
        e.preventDefault();
      }
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "token"]),
  },
};
</script>

<style>
.position-relative {
  position: relative;
}
.online {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: #fff;
}
.online > div {
  margin: 1px;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: #31a24c;
}
.offline {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: #fff;
}
.offline > div {
  margin: 1px;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: #777;
}
.xs {
  max-width: 88%;
  margin: auto;
}
.chat-window {
  height: 80vh;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.chat-window > div:nth-child(1) {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  min-height: 65px;
  align-self: stretch;
}
.chat-window > div:nth-child(2) {
  margin-top: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.chat-window > div > div:nth-child(1) {
  margin-top: auto;
}
.chat-form {
  align-self: center;
  width: 90%;
  margin: 15px 0;
}
.chat-form form {
  display: flex;
  flex-direction: row;
  border: 1px solid #dee2e6;
  border-radius: 20px;
}
.chat-form form textarea {
  outline: 0;
  resize: none;
  width: 85%;
  border: 0px;
  border-radius: 20px;
  padding: 4px 20px;
  max-height: 104px;
  overflow-y: auto;
}
.chat-form button {
  color: #0571ed;
  border: 0px;
  border-radius: 20px;
  background-color: white;
}
.min-height-80vh {
  min-height: 80vh;
}
.h-65px {
  height: 65px;
}
.avatar {
  max-height: 50px;
  width: 50px;
  border-radius: 25px;
}
div a.d-block:hover {
  /* background-color: rgb(199, 199, 199); */
  background-color: #f0f2f5;
  text-decoration: none;
}
div a.d-block.active {
  /* background-color: rgb(199, 199, 199); */
  background-color: #f0f2f5;
}
.friends-box {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.message-box {
  /* display: none; */
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
#messageBox,
#messageBox2 {
  overflow-y: auto;
  overflow-x: hidden;
}
.sent {
  padding: 5px 0;
  width: 100%;
  text-align: right;
}
.sent span {
  display: inline-block;
  height: 100%;
  max-width: 70%;
  margin-right: 0 20px 0 30%;
  background-color: #f0f2f5;
  padding: 10px 10px;
  border-radius: 20px;
  margin: auto 20px auto auto;
  overflow-x: hidden;
  word-wrap: break-word;
}
.received {
  margin-left: 20px;
  padding: 5px 0;
  height: 50px;
  text-align: left;
}
.received span {
  display: inline-block;
  height: 100%;
  margin-right: 20px;
  background-color: #f0f2f5;
  padding: 10px 10px;
  border-radius: 20px;
  margin: auto 20px auto auto;
}
.received img {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 8px;
}
.chat-user {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.chat-user:hover {
  background-color: #eeeeee;
  text-decoration: none;
}
.chat-user > div {
  display: flex;
  max-width: 90%;
  flex: 1;
  justify-content: space-between;
  min-width: 0;
  overflow: hidden;
}
.chat-user > div > div + div {
  max-width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  overflow: hidden;
}
.chat-user > div > div > span + span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #9f9f9f;
}
</style>
