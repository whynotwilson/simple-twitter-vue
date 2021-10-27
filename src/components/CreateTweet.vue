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
      <div class="d-flex mt-4 mb-2 mx-4">
        <router-link
          class="rounded-pill"
          :to="{ name: 'user', params: { id: currentUser.id } }"
        >
          <img class="avatar" :src="currentUser.avatar" alt="avatar" />
        </router-link>
        <div class="ms-2">
          {{ currentUser.name }}
        </div>
      </div>

      <div class="mx-4 mb-2">
        <div class="hashtag-textarea">
          <div
            id="textarea-overlay"
            class="hashtag-textarea__overlay"
            v-html="tweetText"
          ></div>
          <div
            id="inputTrueText"
            @input="replaceTweetText($event.target.innerText)"
            class="hashtag-textarea__true-text"
            wrap="soft"
            contentEditable="true"
            :placeholder="currentUser.name + '，在想些什麼呢？'"
            spellcheck="false"
          ></div>
        </div>
      </div>

      <div class="mb-2 mx-4">
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

<style>
.hashtag-textarea {
  position: relative;
  overflow: auto;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  background: white;
  min-height: 180px;
  height: 100%;
  width: 100%;
}
.hashtag-textarea__true-text {
  padding: 0;
  margin: auto 0px;
  height: 100%;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: 0;
  background: transparent;
  position: absolute;
  top: 0;
  color: transparent;
  caret-color: black;
  outline: none;
  resize: none;
  text-align: left;
}
.hashtag-textarea__overlay {
  padding: 0;
  height: 100%;
  min-height: 178px;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: 0;
  caret-color: black;
  outline: none;
  resize: none;
  text-align: left;
}
.hashtag {
  background: #d1e4fc;
}
</style>

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

    let reg = new RegExp(
      // /(^|\B)#([a-zA-Z0-9_\u4e00-\u9fa5]+)/
      /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_\u4e00-\u9fa5]+)/,
      "g"
    );

    let hashtags = computed(() => {
      if (reg.test(tweetText.value)) {
        return tweetText.value.match(reg);
      } else {
        return [];
      }
    });

    const replaceTweetText = (newValue) => {
      newValue = newValue.replace(reg, function(match) {
        return `<span><a class="hashtag" href="/#/hashtag/${match
          .toLowerCase()
          .replace("#", "")}">${match}</a></span>`;
      });
      tweetText.value = newValue;
    };

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
          tags: hashtags.value.map((hashtag) => {
            return hashtag.toLowerCase().replace("#", "");
          }),
        });

        if (data.status !== "success") {
          throw new Error("無法新增貼文，請稍後再試");
        }

        const { tweet } = data;

        isProcessing.value = false;

        emit("after-create-tweet", tweet);
        tweetText.value = "";
        document.getElementById("inputTrueText").innerText = "";
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
      hashtags,
      replaceTweetText,
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
