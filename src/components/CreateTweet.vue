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

        <input
          type="text"
          :placeholder="currentUser.name + '，在想些什麼呢？'"
          class="rounded-pill form-input form-control"
          v-model="tweetText"
        />
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
import { reactive, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { Toast } from "./../utils/helpers.js";
import tweetsAPI from "./../apis/tweets.js";

export default {
  name: "CreateTweet",
  emits: ["after-create-tweet"],
  setup(props, { emit }) {
    let currentUser = reactive({
      id: 3,
      name: "User2",
      email: "User2@example.com",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    });

    const route = useRoute();
    const isMyPage = computed(() => {
      return Number(currentUser.id) === Number(route.params.id) ? true : false;
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
      currentUser,
      tweetText,
      isTweetTextEmpty,
      handleSubmit,
    };
  },
};
</script>
