<template>
  <div class="form-signin mt-5">
    <form class="w-100" @submit.prevent="handleSubmit">
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
        <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
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
export default {
  setup() {
    return {
      email: ref(""),
      password: ref(""),
    };
  },

  methods: {
    handleSubmit(e) {
      const data = JSON.stringify({
        email: this.email,
        password: this.password,
      });

      // TODO: 向後端驗證使用者登入資訊是否合法
      console.log(e);
      console.log("data", data);
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

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>