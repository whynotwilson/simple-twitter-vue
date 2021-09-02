<template>
  <h3 class="text-center pt-3 pb-2 border-bottom">編輯貼文</h3>
  <form
    enctype="application/x-www-form-urlencoded"
    aria-label="建立 Tweet"
    action="PUT"
    class="bg-white rounded mt-3"
    @submit.prevent="handleSubmit"
  >
    <div class="d-flex mx-4">
      <div class="me-2 my-auto">
        <img class="avatar" :src="currentUser.avatar" alt="avatar" />
      </div>
      <div class="d-flex flex-column">
        <div>{{ currentUser.name }}</div>
        <div>{{ currentUser.email }}</div>
      </div>
    </div>
    <div class="text-align-end">
      <div class="d-flex mt-2 mb-3 mx-4">
        <textarea
          class="form-control resize-none"
          name="description"
          cols="30"
          rows="11"
          v-model="description"
          ref="textarea"
        ></textarea>
      </div>

      <div class="pb-3 mx-4">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="isTweetTextEmpty || !isTweetTextChange"
        >
          編輯
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import tweetsAPI from "./../apis/tweets.js";
import { Toast } from "./../utils/helpers.js";
import { mapState } from "vuex";

export default {
  name: "EditTweet",
  props: {
    initialTweet: {
      type: Object,
    },
  },
  emits: ["after-edit-tweet"],
  setup(props, { emit }) {
    const tweet = computed({
      get: () => props.initialTweet,
    });

    const description = ref(tweet.value.description);

    const isTweetTextEmpty = computed(() => {
      return description.value === "" ? true : false;
    });

    const isTweetTextChange = computed(() => {
      return description.value === tweet.value.description ? false : true;
    });

    const textarea = ref(null);

    const handleSubmit = async function () {
      try {
        const { data } = await tweetsAPI.put({
          description: this.description,
          tweetId: this.tweet.id,
        });

        if (data.status !== "success") {
          throw new Error(data.message || "無法編輯貼文，請稍後再試");
        }

        const { tweet } = data;
        emit("after-edit-tweet", tweet);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法編輯貼文，請稍後再試",
        });

        console.log("Error: ", error);
      }
    };

    return {
      tweet,
      textarea,
      description,
      isTweetTextEmpty,
      isTweetTextChange,
      handleSubmit,
    };
  },
  mounted() {
    this.$refs.textarea.focus();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style>
.resize-none {
  resize: none;
}
</style>