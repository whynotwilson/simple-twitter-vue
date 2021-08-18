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
import { reactive, ref, computed } from "vue";

export default {
  name: "EditTweet",
  props: {
    initialTweet: {
      type: Object,
    },
  },
  setup(props) {
    let currentUser = reactive({
      id: 3,
      name: "User2",
      email: "User2@example.com",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    });

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

    const handleSubmit = function (e) {
      // console.log("description", this.description);
      const form = e.target;
      const formData = new FormData(form);

      for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
        formData.delete(key);
      }
    };

    return {
      currentUser,
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
};
</script>

<style>
.resize-none {
  resize: none;
}
</style>