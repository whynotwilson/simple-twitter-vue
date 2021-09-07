<template>
  <div class="container-sm py-5">
    <UserProfileCard />
    <NavTabs />
    <h1>已標註頁面</h1>
  </div>
</template>

<script>
import UserProfileCard from "./../components/UserProfileCard.vue";
import NavTabs from "./../components/NavTabs.vue";

export default {
  components: {
    UserProfileCard,
    NavTabs,
  },
};
</script>
