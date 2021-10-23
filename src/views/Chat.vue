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
              class="d-block h-65px px-3 d-flex align-items-center"
              v-for="friend in friends"
              :key="friend.id"
              :to="{
                name: 'chat-with-user',
                params: { chattingUserId: friend.id },
              }"
              ><div class="d-flex">
                <div class="position-relative">
                  <img :src="friend.avatar" alt="avatar" class="avatar" />
                  <div :class="friend.isOnline ? 'online' : 'offline'">
                    <div></div>
                  </div>
                </div>
                <div class="ms-2">
                  <span class="d-block">{{ friend.name }}</span>
                  <span class="d-block">last message</span>
                </div>
              </div></router-link
            >
          </div>
        </aside>
        <div
          class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 padding-none border-top border-end border-bottom position-relative"
        >
          <div v-if="isChatUser" class="align-content-stretch">
            <div
              class="d-flex justify-content-center align-items-center border-bottom h-65px"
            >
              <span class="fs-4">{{ chattingUser.name }}</span>
            </div>
            <div>
              <div
                id="messageBox"
                v-if="!isFetchMessagesLoading"
                class="overflow-auto"
              >
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
              <div
                v-else
                class="d-flex justify-content-center align-items-center"
                style="height: calc(80vh - 127px);"
              >
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div class="h-65 chat-form px-4 py-3">
              <form action="POST" class="border" @submit.prevent="handleSubmit">
                <div class="pre"></div>
                <textarea
                  placeholder="訊息......"
                  v-model="message"
                  @keypress="submitOnEnter"
                  @input="changePreText"
                  class="textarea"
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
      <div class="row min-height-80vh">
        <!-- message box -->
        <div
          v-if="isChatUser"
          class="padding-none position-relative message-box bg-white"
        >
          <div class="align-content-stretch">
            <div
              class="d-flex justify-content-center align-items-center border-bottom h-65px"
            >
              <span class="fs-4">{{ chattingUser.name }}</span>
            </div>
            <div>
              <div
                id="messageBox2"
                v-if="!isFetchMessagesLoading"
                class="overflow-auto"
              >
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
              <div
                v-else
                class="d-flex justify-content-center align-items-center"
                style="height: calc(80vh - 127px);"
              >
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <div class="h-65 chat-form px-4 py-3">
              <form action="POST" class="border" @submit.prevent="handleSubmit">
                <div class="pre"></div>
                <textarea
                  placeholder="訊息......"
                  v-model="message"
                  @keypress="submitOnEnter"
                  @input="changePreText"
                  class="textarea"
                ></textarea>
                <button type="submit">傳送</button>
              </form>
            </div>
          </div>
        </div>

        <!-- friends box -->
        <aside v-else class="padding-none border friends-box bg-white">
          <div
            class="d-flex justify-content-center align-items-center border h-65px"
          >
            <span class="fs-4">name</span>
          </div>
          <div class="d-flex flex-column">
            <router-link
              class="d-block h-65px px-3 d-flex align-items-center"
              v-for="friend in friends"
              :key="friend.id"
              :to="{
                name: 'chat-with-user',
                params: { chattingUserId: friend.id },
              }"
              ><div class="d-flex">
                <div class="position-relative">
                  <img :src="friend.avatar" alt="avatar" class="avatar" />
                  <div :class="friend.isOnline ? 'online' : 'offline'">
                    <div></div>
                  </div>
                </div>
                <div class="ms-2">
                  <span class="d-block">{{ friend.name }}</span>
                  <span class="d-block">last message</span>
                </div>
              </div>
            </router-link>
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
          data.message.class = data.status ? "sent" : "received";
          data.message.messageStatus = data.status === "success" ? true : false;
          updateMessages(data.message);
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
    changePreText() {
      let textarea = document.getElementsByClassName("textarea");
      let pre = document.getElementsByClassName("pre");
      pre[0].innerHTML = textarea[0].value.replace(/\n/g, "<br/>' '");
      pre[1].innerHTML = textarea[1].value.replace(/\n/g, "<br/>' '");
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
.chat-form {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.chat-form form {
  position: relative;
  width: 100%;
  border-radius: 50px;
}
.chat-form form div.pre {
  position: relative;
  display: block;
  visibility: hidden;
  width: 80%;
  word-wrap: break-word;
  padding: 2px 20px;
  margin: 0;
  min-height: 28px;
}
.chat-form form textarea {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
  outline: 0;
  resize: none;
  overflow: hidden;
  width: 80%;
  border: none;
  padding: 2px 20px;
}
.chat-form button {
  color: #0571ed;
  border: none;
  background-color: white;
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translate(0, -50%);
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
textarea {
  resize: none;
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
  max-height: calc(80vh - 127px);
}
.sent {
  padding: 5px 0;
  height: 50px;
  width: 100%;
  text-align: right;
}
.sent span {
  display: inline-block;
  height: 100%;
  margin-right: 20px;
  background-color: #f0f2f5;
  padding: 10px 10px;
  border-radius: 20px;
  margin: auto 20px auto auto;
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
</style>
