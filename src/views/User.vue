<template>
  <div class="d-flex flex-column py-5">
    <div
      class="text-center mx-auto col-xl-8 col-xl-8 col-lg-9 col-md-10 col-sm-12"
    >
      <UserProfileCard />
    </div>
    <div
      class="text-center mx-auto col-xl-8 col-xl-8 col-lg-9 col-md-10 col-sm-12"
    >
      <NavTabs />
    </div>

    <div
      class="
        d-flex
        mx-auto
        col-xxl-6 col-xl-7 col-lg-8 col-md-10 col-sm-12 col-12
      "
    >
      <Tweets />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "./../components/UserProfileCard.vue";
import NavTabs from "./../components/NavTabs.vue";
import Tweets from "./../components/Tweets.vue";
import { ref, provide, readonly } from "vue";

export default {
  name: "User",
  components: {
    UserProfileCard,
    NavTabs,
    Tweets,
  },
  setup() {
    let isUserEdited = ref(false);
    const updateIsUserEdited = (boolean) => {
      isUserEdited.value = boolean;
    };

    provide("isUserEdited", readonly(isUserEdited));
    provide("updateIsUserEdited", updateIsUserEdited);
  },
};
</script>
