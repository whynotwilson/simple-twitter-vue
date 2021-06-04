<template>
  <div class="d-flex justify-content-center container-xxl mt-5">
    <div
      class="
        min-height-90vh
        padding-none
        d-flex
        col-xxl-6 col-xl-6 col-lg-7 col-md-8 col-sm-10 col-12
        mx-auto
      "
    >
      <Tweets />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import Tweets from "../components/Tweets.vue";

export default {
  name: "home",
  components: {
    Tweets,
  },
  setup() {
    let currentUser = reactive({
      id: 3,
      name: "User2",
      email: "User2@example.com",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    });

    return { currentUser };
  },
};
</script>

<style>
.bg-white {
  background-color: white;
}
.form-input {
  background-color: #f0f2f5;
  font-size: 15px;
  margin-left: 10px;
}
.form-img {
  max-height: 40px;
}
.min-height-90vh {
  min-height: 90vh;
}
.text-align-end {
  text-align: end;
}
.padding-none {
  padding: 0;
}
</style>