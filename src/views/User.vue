<template>
  <div class="d-flex flex-column py-5">
    <div class="mx-auto col-xl-8 col-xl-8 col-lg-9 col-md-10 col-sm-12">
      <UserProfileCard />
     </div>
    <div class="mx-auto col-xl-8 col-xl-8 col-lg-9 col-md-10 col-sm-12">
      <NavTabs />
    </div>
  </div>
</template>

<script>
import UserProfileCard from "../components/UserProfileCard.vue";
import NavTabs from "../components/NavTabs.vue";

export default {
  name: "User",
  components: {
    UserProfileCard,
    NavTabs,
  },
};
</script>
