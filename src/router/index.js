import { createRouter, createWebHashHistory } from "vue-router";
import PageNotFound from "./../views/PageNotFound.vue";
import SignIn from "./../views/SignIn.vue";
import SignUp from "./../views/SignUp.vue";
import Home from "./../views/Home.vue";
import store from "./../store";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: SignUp,
  },
  {
    path: "/tweets",
    name: "home",
    component: Home,
  },
  {
    path: "/hashtag/:hashtag",
    name: "hashtag",
    component: () => import("./../views/Hashtag.vue"),
  },
  {
    path: "/hashtag/:hashtag",
    name: "hashtag-not-exist",
    component: () => import("./../views/NotExist.vue"),
  },
  {
    path: "/users/:id",
    name: "user",
    component: () => import("./../views/User.vue"),
  },
  {
    path: "/users/:id",
    name: "not-exist",
    component: () => import("./../views/NotExist.vue"),
  },
  {
    path: "/users/:id/tags",
    name: "tags",
    component: () => import("./../views/Tags.vue"),
  },
  {
    path: "/chat",
    name: "chat-index",
    component: () => import("./../views/Chat.vue"),
  },
  {
    path: "/chat/:chattingUserId",
    name: "chat-with-user",
    component: () => import("./../views/Chat.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: "active",
  routes,
});

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem("token");
  const tokenInStore = store.state.token;
  let isAuthenticated = store.state.isAuthenticated;

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch("fetchCurrentUser");
  }

  // 如果 token 無效且不是到註冊頁則轉址到登入頁
  if (!isAuthenticated && to.name !== "sign-in" && to.name !== "sign-up") {
    next("/signin");
    return;
  }

  // 如果 token 有效則轉址到首頁
  if (isAuthenticated && to.name === "sign-in") {
    next("/tweets");
    return;
  }

  next();
});

export default router;
