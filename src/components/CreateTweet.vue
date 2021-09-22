<template>
  <form
    v-show="isMyPage"
    enctype="application/x-www-form-urlencoded"
    aria-label="建立 Tweet"
    action="POST"
    class="bg-white border rounded mt-4 mx-2"
    @submit.prevent="handleSubmit"
  >
    <div class="text-align-end">
      <div class="d-flex mt-4 mb-3 mx-4">
        <router-link
          class="rounded-pill"
          :to="{ name: 'user', params: { id: currentUser.id } }"
        >
          <img class="avatar" :src="currentUser.avatar" alt="avatar" />
        </router-link>

        <textarea
          :placeholder="currentUser.name + '，在想些什麼呢？'"
          class="form-control ms-2"
          v-model="tweetText"
          cols="20"
          rows="5"
        ></textarea>
      </div>

      <div class="mb-3 mx-4">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isTweetTextEmpty"
        >
          發佈
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { mapState, useStore } from "vuex";
import { useRoute } from "vue-router";
import { Toast } from "./../utils/helpers.js";
import tweetsAPI from "./../apis/tweets.js";

export default {
  name: "CreateTweet",
  emits: ["after-create-tweet"],
  setup(props, { emit }) {
    const route = useRoute();
    const store = useStore();

    const isMyPage = computed(() => {
      if (!route.params.id) {
        return true;
      }
      return Number(store.state.currentUser.id) === Number(route.params.id)
        ? true
        : false;
    });

    let isProcessing = ref(false);
    let tweetText = ref("");

    const isTweetTextEmpty = computed(() => {
      return tweetText.value ? false : true;
    });

    const handleSubmit = async () => {
      try {
        if (!tweetText.value) {
          Toast.fire({
            icon: "warning",
            title: "您尚未填寫任何貼文",
          });
          return;
        }

        isProcessing.value = true;
        tweetText.value = tweetText.value.replace(/\n/g, "<br/>");

        const { data } = await tweetsAPI.create({
          tweetText: tweetText.value,
        });

        if (data.status !== "success") {
          throw new Error("無法新增貼文，請稍後再試");
        }

        const { tweet } = data;

        isProcessing.value = false;

        emit("after-create-tweet", tweet);
        tweetText.value = "";
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法新增貼文，請稍後再試",
        });

        isProcessing.value = false;
        tweetText.value = "";
        console.log("Error: ", error);
      }
    };

    return {
      isMyPage,
      isProcessing,
      tweetText,
      isTweetTextEmpty,
      handleSubmit,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
