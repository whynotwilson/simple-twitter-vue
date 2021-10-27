<template>
  <div
    class="pt-3 container-fluid d-flex justify-content-start bg-white border-top"
  >
    <div class="mx-auto pb-3 w-80 word-wrap-break">
      <H1>#{{ hashtag }}</H1>
    </div>
  </div>

  <div
    class="
        d-flex
        mx-auto
        col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-sm-12 col-12
      "
  >
    <div v-if="!isLoading" class="container mt-3">
      <TweetCard
        v-for="tweet in tweetsData.tweets"
        :key="tweet.id"
        :initial-tweet="tweet"
        :initial-replies="tweet.Replies"
      />
    </div>
  </div>

  <div
    class="pt-3 container-fluid d-flex justify-content-start bg-white border-top"
    v-if="tweetsData.tweets.length < 1"
  >
    <div class="mx-auto pb-3 w-80 word-wrap-break">
      <div>
        <h1 style="color: red">此 hashtag 尚無貼文</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { mapState, useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { Toast } from "./../utils/helpers.js";
import TweetCard from "./../components/TweetCard.vue";
import hashtagsAPI from "./../apis/hashtags.js";

export default {
  name: "Hashtag",
  components: {
    TweetCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    let hashtag = ref("");
    let isLoading = ref(true);
    const store = useStore();
    let tweetsData = reactive({
      tweets: [],
    });

    hashtag.value = route.params.hashtag;

    const fetchTweets = async () => {
      try {
        isLoading.value = true;

        let { data } = await hashtagsAPI.getTweets({
          hashtag: hashtag.value,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        let { hashtagedTweets } = data;

        hashtagedTweets = hashtagedTweets.map((tweet) => {
          tweet.isThumbsUp = tweet.LikedUsers.map((user) => user.id).includes(
            store.state.currentUser.id
          );
          tweet.likedCount = tweet.LikedUsers.length;
          return tweet;
        });

        hashtagedTweets.sort(function(a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        tweetsData.tweets = hashtagedTweets;

        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        if (error.message === "this tag is not exist") {
          router.push({ name: "hashtag-not-exist" });
          Toast.fire({
            icon: "error",
            title: `hashtag: ${hashtag.value} 不存在，請使用 # 創建`,
            timer: 7000,
          });
        } else {
          Toast.fire({
            icon: "error",
            title: "無法取得貼文資料，請稍後再試",
          });
        }

        console.log("Error: ", error);
      }
    };

    onMounted(async () => {
      fetchTweets();
    });

    onBeforeRouteUpdate((to, from, next) => {
      hashtag.value = to.params.hashtag;
      fetchTweets();
      next();
    });

    return {
      hashtag,
      isLoading,
      tweetsData,
    };
  },

  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style>
.w-80 {
  width: 80%;
}
</style>
