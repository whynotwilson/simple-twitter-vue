<template>
  <div v-show="isMask !== ''">
    <Mask @hide-mask="hideMask" />
  </div>

  <div v-if="isMask === 'editTweet'" class="z-index-1090 bg-white mask-box">
    <EditTweet :initialTweet="toEditTweet" @after-edit-tweet="afterEditTweet" />
  </div>

  <div class="container">
    <CreateTweet @after-create-tweet="afterCreateTweet" />

    <TweetCard
      v-for="tweet in tweetsData.tweets"
      :key="tweet.id"
      :initial-tweet="tweet"
      :initial-replies="tweet.Replies"
      @after-delete-like="afterDeleteLike"
      @after-add-like="afterAddLike"
      @after-create-comment="afterCreateComment"
      @after-delete-tweet="afterDeleteTweet"
      @update-mask="showMask"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, computed } from "vue";
import TweetCard from "../components/TweetCard.vue";
import CreateTweet from "./../components/CreateTweet.vue";
import Mask from "./../components/Mask.vue";
import EditTweet from "./../components/EditTweet.vue";
import tweetsAPI from "./../apis/tweets.js";
import usersAPI from "./../apis/users.js";
import { Toast } from "./../utils/helpers.js";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export default {
  components: {
    TweetCard,
    CreateTweet,
    Mask,
    EditTweet,
  },
  props: {
    view: {
      type: String,
    },
  },
  setup(props) {
    const key = computed({
      get: () => props.view,
    });

    const route = useRoute();
    let userId = route.params.id;

    let currentUser = reactive({
      id: 3,
      name: "User2",
      email: "User2@example.com",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    });

    let tweetsData = reactive({
      tweets: [],
    });

    const fetchTweets = async () => {
      try {
        const processData = (data) => {
          if (!data) {
            throw new Error(data.message);
          }

          data = data.map((tweet) => {
            tweet.isThumbsUp = tweet.LikedUsers.map((user) => user.id).includes(
              currentUser.id
            );
            tweet.likedCount = tweet.LikedUsers.length;
            return tweet;
          });

          data.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          tweetsData.tweets = data;
        };

        if (route.path.includes("tweet")) {
          let { data } = await tweetsAPI.get();
          processData(data);
        } else if (route.path.includes("user")) {
          let { data } = await usersAPI.getTweets({ userId });
          processData(data);
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得貼文資料，請稍後再試",
        });

        console.log("Error: ", error);
      }
    };

    onMounted(async () => {
      fetchTweets();
    });

    onBeforeRouteUpdate((to, from, next) => {
      userId = to.params.id;
      fetchTweets();
      next();
    });

    let isMask = ref("");
    let toEditTweet = ref({});

    // 彈出遮罩時禁止底層頁面滾動
    watch(isMask, (oldValue, newValue) => {
      if (!newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });

    return {
      key,
      currentUser,
      tweetsData,
      isMask,
      toEditTweet,
    };
  },

  methods: {
    afterCreateTweet(tweet) {
      this.tweetsData.tweets.unshift({
        LikedUsers: [],
        Replies: [],
        User: this.currentUser,
        UserId: this.currentUser.id,
        createdAt: new Date(),
        description: tweet.description,
        id: tweet.id,
        isThumbsUp: false,
        likedCount: 0,
        replyCount: 0,
      });
    },

    afterDeleteLike(tweetId) {
      this.tweetsData.tweets = this.tweetsData.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          tweet.LikedUsers = tweet.LikedUsers.filter(
            (user) => user.id !== this.currentUser.id
          );
          tweet.isThumbsUp = false;
          tweet.likedCount = tweet.likedCount - 1;
          return tweet;
        }
      });
    },

    afterAddLike(tweetId) {
      this.tweetsData.tweets = this.tweetsData.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          tweet.LikedUsers.push(this.currentUser);
          tweet.isThumbsUp = true;
          tweet.likedCount = tweet.likedCount + 1;
          return tweet;
        }
      });
    },

    afterCreateComment(payload) {
      const { tweetId, comment, user, replyId } = payload;
      this.tweetsData.tweets = this.tweetsData.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          tweet.Replies.unshift({
            TweetId: tweetId,
            User: user,
            UserId: user.id,
            comment,
            createdAt: new Date(),
            id: replyId,
          });
          return tweet;
        }
      });
    },

    afterDeleteTweet(tweetId) {
      this.tweetsData.tweets = this.tweetsData.tweets.filter((tweet) => {
        return tweet.id !== tweetId;
      });

      // 按日期排序，新的最前面
      this.tweetsData.tweets.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },

    afterEditTweet(tweet) {
      this.tweetsData.tweets = this.tweetsData.tweets.map((t) => {
        if (tweet.id !== t.id) {
          return t;
        } else {
          t.description = tweet.description;
          return t;
        }
      });

      this.hideMask();
    },

    hideMask() {
      this.isMask = "";
      this.toEditTweet = {};
    },

    showMask(payload) {
      const { key, id } = payload;
      this.isMask = key;
      this.toEditTweet = this.tweetsData.tweets.filter(
        (tweet) => tweet.id === id
      )[0];
    },
  },
};
</script>

<style>
.mask-box {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  height: 200px;
  min-width: 280px;
}
.z-index-1090 {
  z-index: 1090;
}
</style>
