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
            <div>test</div>
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
            <div>test</div>
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
import { ref, computed, watch, onMounted } from "vue";
import { mapState, useStore } from "vuex";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";

export default {
  name: "Chat",
  setup() {
    let isLoading = ref(false);
    const route = useRoute();
    const userId = route.params.id;

    let chattingUserId = computed(() => route.params.chattingUserId);
    let isChatUser = computed(() => (chattingUserId.value ? true : false));

    let dummyData = reactive({
      friends: [
        {
          id: 2,
          email: "user1@example.com",
          name: "user1",
          avatar:
            "https://images.unsplash.com/photo-1544817747-b11e3e3b6ac2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
          introduction:
            "Corrupti aut sint laudantium officia est culpa voluptas. Tenetur debitis soluta occaecati assumenda ex eveniet. Optio quas qui dolores vitae. Placeat tenetur accusantium harum voluptas iste quibusdam et. Corrupti reiciendis sit voluptatum quam. Nesciunt esse non modi et quibusdam officia vel rerum.",
          role: "user",
          createdAt: "2021-04-22T13:07:01.000Z",
          updatedAt: "2021-04-22T13:07:01.000Z",
          Followship: {
            id: 3,
            followerId: 5,
            followingId: 2,
            createdAt: "2021-04-22T13:06:53.000Z",
            updatedAt: "2021-04-22T13:06:53.000Z",
          },
          isOnline: true,
        },
        {
          id: 7,
          email: "user6@example.com",
          name: "user6",
          avatar:
            "https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
          introduction:
            "Ut explicabo ut vitae culpa eligendi nobis nihil.\nSunt est sapiente qui nulla molestiae eveniet et ut.",
          role: "user",
          createdAt: "2021-04-22T13:07:02.000Z",
          updatedAt: "2021-04-22T13:07:02.000Z",
          Followship: {
            id: 138,
            followerId: 5,
            followingId: 7,
            createdAt: "2021-10-08T15:03:38.000Z",
            updatedAt: "2021-10-08T15:03:38.000Z",
          },
          isOnline: false,
        },
        {
          id: 8,
          email: "user7@example.com",
          name: "user7",
          avatar:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ4MjM4OTA2OF5BMl5BanBnXkFtZTcwNDM3NzIzOQ@@._V1_UX172_CR0,0,172,256_AL_.jpg",
          introduction: "Nihil nisi commodi.",
          role: "user",
          createdAt: "2021-04-22T13:07:02.000Z",
          updatedAt: "2021-04-22T13:07:02.000Z",
          Followship: {
            id: 139,
            followerId: 5,
            followingId: 8,
            createdAt: "2021-10-08T15:03:39.000Z",
            updatedAt: "2021-10-08T15:03:39.000Z",
          },
          isOnline: true,
        },
      ],
    });
    let onlineUsersId = ref([]);

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
        let friend = dummyData.friends.find((f) => f.id === Number(newValue));
        chattingUser.value = Object.assign({}, friend);
        wsConnect(chattingUserId.value);
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

    onMounted(() => {
      if (isChatUser.value) {
        wsConnect(chattingUserId.value);
      }
    });

    return {
      friends: dummyData.friends,
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
</style>
