<template>
  <div class="body">
    <div id="simple-twitter">
      <Navbar />
    </div>
    <router-view />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
.body {
  background-color: #f0f2f5;
  min-height: 100vh;
}
</style>