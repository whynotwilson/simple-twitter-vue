<template>
  <div class="form-signin mt-5">
    <form
      enctype="application/x-www-form-urlencoded"
      class="w-100"
      @submit.prevent="handleSubmit"
    >
      <div class="text-center mb-4">
        <h1 class="h2 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-3">
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
        />
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <div class="text-center">
        <button
          class="btn btn-lg btn-primary btn-block mb-3"
          type="submit"
          :disabled="isProcessing"
        >
          Submit
        </button>
      </div>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup"> Sign Up </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2021</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import authorizationAPI from "./../apis/authorization.js";
import { Toast } from "./../utils/helpers.js";

export default {
  setup() {
    return {
      email: ref(""),
      password: ref(""),
      isProcessing: ref(false),
    };
  },

  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入信箱及密碼",
          });
          return;
        }

        this.isProcessing = true;

        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });

        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);
        this.$store.commit("setCurrentUser", data.user);
        this.$router.push("/tweets");

        Toast.fire({
          icon: "success",
          title: "登入成功",
        });
      } catch (error) {
        this.password = "";
        Toast.fire({
          icon: "error",
          title: "信箱或密碼錯誤",
        });

        this.isProcessing = false;
        console.log("Error: ", error);
      }
    },
  },
};
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 12px;
}

.swal2-container {
  z-index: 2000;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>