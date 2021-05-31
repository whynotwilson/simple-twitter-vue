<template>
  <nav
    class="
      navbar
      sticky-top
      navbar-expand-lg navbar-light
      bg-white
      padding-none
    "
  >
    <div class="container-fluid d-flex justify-content-start">
      <router-link class="navbar-brand mr-0" to="/" style="display: block">
        <img src="../../public/favicon.png" class="logo" alt="logo" />
      </router-link>

      <form
        class="form-inline d-none d-sm-block ms-2"
        @submit.prevent="handleSearch"
      >
        <input
          class="form-control mr-sm-2 rounded-pill"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="searchString"
          @blur="cancelIsSearching"
          @focus="confirmIsSearching"
        />
        <span class="d-none">{{ isSearching }}</span>
      </form>

      <!-- 帳號和控制選項 -->
      <div class="d-flex account-setting">
        <div
          aria-label="帳號控制項和設定"
          class="d-flex dropdown-button align-items-center"
          v-tooltip="{
            theme: {
              placement: 'bottom',
            },
          }"
        >
          <button
            type="button"
            class="btn-circle"
            v-tooltip="'功能表'"
            id="applicationDropdownButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-2x fa-bars"></i>
          </button>
          <div
            class="dropdown-menu dropdown-content overflow-auto"
            aria-labelledby="applicationDropdownButton"
          >
            <a class="dropdown-item" href="#">item</a>
            <a class="dropdown-item" href="#">item</a>
          </div>

          <button
            class="btn-circle"
            v-tooltip="'Messenger'"
            id="messengerDropdownButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fab fa-2x fa-facebook-messenger"></i>
          </button>
          <div
            class="dropdown-menu dropdown-content overflow-auto"
            aria-labelledby="messengerDropdownButton"
          >
            <a class="dropdown-item" href="#">messenger</a>
            <a class="dropdown-item" href="#">messenger</a>
            <a class="dropdown-item" href="#">messenger</a>
          </div>

          <button
            class="btn-circle"
            v-tooltip="'通知'"
            id="bellDropdownButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-2x fa-bell"></i>
          </button>
          <div
            class="dropdown-menu dropdown-content overflow-auto"
            aria-labelledby="bellDropdownButton"
          >
            <a class="dropdown-item" href="#">通知</a>
            <a class="dropdown-item" href="#">通知</a>
          </div>

          <button
            class="btn-circle"
            v-tooltip="'帳號'"
            id="accountDropdownButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-2x fa-caret-down"></i>
          </button>
          <div
            class="dropdown-menu dropdown-content overflow-auto"
            aria-labelledby="accountDropdownButton"
          >
            <a class="dropdown-item" href="#">{{ currentUser.name }}</a>
            <div class="dropdown-divider"></div>
            <a v-if="isAuthenticated" class="dropdown-item" href="#">登出</a>
            <a v-else class="dropdown-item" href="#">登入</a>
          </div>
        </div>
      </div>
    </div>

    <div class="d-block d-sm-none mx-3 width-100">
      <form class="form-inline" @submit.prevent="handleSearch">
        <input
          class="form-control mr-sm-2 search-input rounded-pill"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="searchString"
          @blur="cancelIsSearching"
          @focus="confirmIsSearching"
        />
        <span class="d-none">{{ isSearching }}</span>
      </form>
    </div>
  </nav>
</template>
 
<script>
import { reactive } from "vue";
import { ref } from "vue";

export default {
  setup() {
    let currentUser = reactive({
      id: 3,
      name: "User2",
      email: "User2@example.com",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    });
    let isAuthenticated = ref(true);

    let searchString = ref("");
    let isSearching = ref(false);

    const handleSearch = () => {
      console.log(searchString.value);
    };

    // 做為以後根據 isSearching 狀態改變 search form 用
    const confirmIsSearching = () => {
      isSearching.value = true;
    };

    const cancelIsSearching = () => {
      isSearching.value = false;
    };

    return {
      currentUser,
      searchString,
      isSearching,
      isAuthenticated,
      handleSearch,
      confirmIsSearching,
      cancelIsSearching,
    };
  },
};
</script>

<style>
.logo {
  max-height: 55px;
  max-width: 55px;
}
.btn-circle {
  width: 45px;
  height: 45px;
  text-align: center;
  padding: 6px 0;
  font-size: 12px;
  line-height: 1.428571429;
  border: white;
  border-radius: 26px;
  margin-right: 10px;
  background-color: #f0f2f5;
}
.btn-circle:hover {
  background-color: rgb(199, 199, 199);
}
.user {
  margin-left: auto;
  max-height: 44px;
  border-radius: 22px;
}
.avatar {
  max-height: 40px;
  border-radius: 22px;
}
.user:hover {
  background-color: rgb(199, 199, 199);
}
.dropdown-button {
  position: relative;
}
.dropdown-content {
  position: absolute;
  right: 22px;
  width: 210px;
  max-height: 80vh;
}
[aria-expanded="true"] {
  background-color: #e7f3ff;
  color: #0571ed;
}
.isSearching {
  position: absolute;
  left: 18px;
}
.account-setting {
  margin-left: auto;
}
.navbar {
  z-index: 1070;
}
.width-100 {
  width: 100%;
}
.mr-0 {
  margin-right: 0;
}

@media (max-width: 576px) {
  .btn-circle {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
}
</style>

