<template>
  <div class="bg-white border rounded mt-3 mx-2">
    <!-- tweet -->
    <div>
      <!-- 個人欄 -->
      <div class="d-flex mx-4 mt-2">
        <div class="my-auto">
          <router-link :to="{ name: 'user', params: { id: tweet.User.id } }">
            <img class="avatar" :src="tweet.User.avatar" alt="avatar" />
          </router-link>
        </div>
        <div class="mx-2 flex">
          <div>
            <router-link
              class="rounded-pill"
              :to="{ name: 'user', params: { id: tweet.User.id } }"
            >
              {{ tweet.User.name }}
            </router-link>
          </div>
          <div>{{ fromNow(tweet.createdAt) }}</div>
        </div>
        <div class="dropdown-button ml-auto my-auto">
          <button
            class="ellipsis"
            id="tweetEllipsisDropdownButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-ellipsis-h"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-end overflow-auto"
            aria-labelledby="tweetEllipsisDropdownButton"
            v-if="isMyPage"
          >
            <a
              class="dropdown-item"
              href="#"
              @click.prevent="showMask('editTweet')"
              >編輯</a
            >
            <a class="dropdown-item" href="#">刪除</a>
          </div>
          <div
            class="dropdown-menu dropdown-menu-end overflow-auto"
            aria-labelledby="tweetEllipsisDropdownButton"
            v-else
          >
            <a class="dropdown-item" href="#" @click.prevent="">取消</a>
          </div>
        </div>
      </div>

      <!-- tweet 內容 -->
      <div class="mx-4 mt-2 word-wrap-break">
        {{ tweet.description }}
      </div>

      <!-- 按讚人數，留言人數 -->
      <div class="mx-4 mt-2">
        <div class="d-flex" v-show="tweet.likedCount || replies.length">
          <div v-if="tweet.likedCount" class="">
            <i class="far fa-thumbs-up text-primary"></i>
          </div>
          <span v-if="tweet.likedCount"> {{ tweet.likedCount }}</span>
          <a
            v-if="replies.length"
            class="ml-auto comment-collapse"
            data-bs-toggle="collapse"
            :href="'#collapse' + tweet.id"
            aria-expanded="false"
            aria-controls="#comment-collapse"
          >
            {{ replies.length }} 則留言
          </a>
        </div>
      </div>

      <!-- 按讚、留言 -->
      <div class="mx-4 mt-2 d-flex py-2 border-top border-bottom">
        <div
          v-if="tweet.isThumbsUp"
          class="flex-fill text-center operation-button"
          @click.prevent="deleteLike(tweet.id)"
        >
          <span :class="{ textPrimary: tweet.isThumbsUp }"
            ><i class="fas fa-thumbs-up"></i> 讚</span
          >
        </div>
        <div
          v-else
          class="flex-fill text-center operation-button"
          @click.prevent="addLike(tweet.id)"
        >
          <span :class="{ textPrimary: tweet.isThumbsUp }"
            ><i class="far fa-thumbs-up"></i> 讚</span
          >
        </div>
        <div
          class="flex-fill text-center operation-button"
          @click="focusCommentInput"
        >
          <span><i class="far fa-comment-alt"></i> 留言</span>
        </div>
      </div>
    </div>

    <!-- 留言內容 -->
    <div class="collapse mx-4 mt-4" :id="'collapse' + tweet.id" ref="collapse">
      <form
        aria-label="建立留言"
        action="POST"
        class="bg-white rounded"
        @submit.prevent="handleSubmit(tweet.id)"
      >
        <div class="">
          <div class="d-flex my-2">
            <router-link
              class="rounded-pill"
              :to="{ name: 'user', params: { id: currentUser.id } }"
            >
              <img
                class="comment-avatar"
                :src="currentUser.avatar"
                alt="avatar"
              />
            </router-link>

            <input
              type="text"
              placeholder="留言......"
              class="rounded-pill form-input form-control comment-input"
              v-model="comment"
              ref="commentInput"
            />
          </div>
          <div v-show="replies.length">
            <div
              class="d-flex align-items-start mb-2"
              v-for="reply in replies"
              :key="reply.id"
            >
              <img
                class="comment-avatar"
                :src="reply.User.avatar"
                alt="avatar"
              />
              <div class="comment-div">
                <div class="flex px-3 py-1">
                  <router-link
                    class="rounded-pill"
                    :to="{ name: 'user', params: { id: reply.User.id } }"
                  >
                    {{ reply.User.name }}
                  </router-link>
                  <div class="word-wrap-break">{{ reply.comment }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref, reactive } from "vue";
import moment from "moment";
import { useRoute } from "vue-router";

export default {
  name: "TweetCard",
  props: {
    initialTweet: {
      type: Object,
    },
    initialReplies: {
      type: Object,
    },
  },
  emits: [
    "after-add-like",
    "after-delete-like",
    "after-create-comment",
    "update-mask",
  ],
  setup(props, { emit }) {
    let currentUser = reactive({
      id: 3,
      name: "User2",
      email: "User2@example.com",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    });

    const route = useRoute();
    let isMyPage = ref(Boolean);

    if (route.params.id) {
      isMyPage = Number(route.params.id) === currentUser.id ? true : false;
    }

    let isAuthenticated = ref(true);
    const tweet = computed({
      get: () => props.initialTweet,
    });

    const replies = computed({
      get: () => props.initialReplies,
    });

    let comment = ref("");
    const commentInput = ref(null);
    const collapse = ref(null);

    const deleteLike = async (tweetId) => {
      // 待串接 api, Delete '/tweets/:id'
      emit("after-delete-like", tweetId);
    };

    const addLike = async (tweetId) => {
      // 待串接 api, Post '/tweets/:id/like'
      emit("after-add-like", tweetId);
    };

    const handleSubmit = async (tweetId) => {
      // 待串接 api, Post '/replies'
      emit("after-create-comment", {
        tweetId,
        comment: comment.value,
      });
    };

    const fromNow = (datetime) => {
      if (!datetime) {
        return "";
      }
      return moment(datetime).fromNow();
    };

    const showMask = (key) => {
      emit("update-mask", { key, id: tweet.value.id });
    };
    return {
      tweet,
      replies,
      comment,
      currentUser,
      isAuthenticated,
      isMyPage,
      commentInput,
      collapse,
      deleteLike,
      addLike,
      handleSubmit,
      fromNow,
      showMask,
    };
  },
  methods: {
    focusCommentInput() {
      if (!this.$refs.collapse.classList.value.includes("show")) {
        this.$refs.collapse.classList.value =
          this.collapse.classList.value + " show";
      }
      this.$refs.commentInput.focus();
    },
  },
};
</script>

<style>
.bg-white {
  background-color: white;
}
.avatar {
  max-height: 40px;
  border-radius: 22px;
}
.ml-auto {
  margin-left: auto;
}
.ellipsis {
  width: 35px;
  height: 35px;
  font-size: 12px;
  line-height: 1.428571429;
  border: white;
  border-radius: 26px;
  margin-top: auto;
  margin-bottom: auto;
  background-color: #f0f2f5;
}
.ellipsis:hover {
  background-color: rgb(199, 199, 199);
}
.circle {
  height: 30px;
  width: 30px;
  border: black;
  border-radius: 10px;
}
.comment-collapse {
  color: #65676b;
}
.comment-collapse:hover {
  color: #65676b;
  background-color: #f0f2f5;
}
.comment-avatar {
  height: 30px;
  width: 30px;
  border-radius: 15px;
  margin-bottom: auto;
}
.comment-input {
  max-height: 30px;
}
.operation-button:hover {
  background-color: #f0f2f5;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: underline;
  color: black;
}
.comment-div {
  margin-left: 10px;
  background-color: #f0f2f5;
  border-radius: 15px;
  max-width: 92%;
}
[aria-expanded="true"] {
  background-color: #f0f2f5;
}
.textPrimary {
  color: #0d6efd;
}
.dropdown-menu a:hover {
  text-decoration: none;
}
.word-wrap-break {
  word-wrap: break-word;
}
</style>
