<template>
  <div
    class="pt-3 container-fluid d-flex justify-content-start bg-white border-top"
  >
    <div class="mx-auto pb-3 w-80 word-wrap-break">
      <H1>#{{ hashtag }}</H1>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  name: "Hashtag",
  setup() {
    const route = useRoute();
    const { hashtag } = route.params;

    return {
      hashtag,
    };
  },
};
</script>

<style>
.w-80 {
  width: 80%;
}
</style>
