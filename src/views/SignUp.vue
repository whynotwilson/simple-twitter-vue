<template>
  <div class="form-signin mt-5">
    <form
      class="w-100"
      @submit.prevent="handleSubmit"
      enctype="application/x-www-form-urlencoded"
    >
      <div class="text-center mb-4">
        <h1 class="h2 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        />
      </div>
      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
          autofocus
        />
      </div>
      <div class="form-label-group mb-2">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="password"
          autocomplete="new-password"
          required
        />
      </div>
      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="password-check"
          type="password"
          class="form-control"
          placeholder="password-check"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="text-center">
        <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
          Submit
        </button>
      </div>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin"> Sign In </router-link>
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
      name: ref(""),
      email: ref(""),
      password: ref(""),
      passwordCheck: ref(""),
    };
  },

  methods: {
    async handleSubmit() {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: "warning",
            title: "請確認已填寫所有欄位",
          });
          return;
        }

        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "兩次輸入的密碼不同",
          });
          this.passwordCheck = "";
          return;
        }

        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        Toast.fire({
          icon: "success",
          title: "註冊成功",
        });

        this.$router.push("/signin");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error || "無法註冊，請稍後再試",
        });

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
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>