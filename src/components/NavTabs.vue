<template>
  <ul class="d-flex justify-content-center padding-none">
    <li class="px-4" v-for="tab in tabs" :key="tab.id">
      <router-link
        :to="{ name: tab.pathName, params: { id: user.id } }"
        class="nav-link"
      >
        <i :class="tab.fontClass"></i>
        {{ tab.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { reactive } from "vue";
import usersAPI from "./../apis/users.js";
import { Toast } from "./../utils/helpers.js";
import { onMounted, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

export default {
  name: "NavTabs",
  setup() {
    let dummyData = reactive({
      tabs: [
        {
          id: 1,
          title: "貼文",
          pathName: "user",
          fontClass: {
            fas: true,
            "fa-grip-horizontal": true,
          },
        },
        // {
        //   id: 2,
        //   title: "已標註",
        //   pathName: "tags",
        //   fontClass: {
        //     fas: true,
        //     "fa-user-tag": true,
        //   },
        // },
      ],
    });

    let user = ref({});
    const route = useRoute();
    let userId = route.params.id;

    const getUser = async () => {
      try {
        const { data } = await usersAPI.getUser({ userId });
        user.value = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得用戶資料，請稍後再試",
        });

        console.log("Error: ", error);
      }
    };

    onMounted(getUser());

    onBeforeRouteUpdate((to, from, next) => {
      userId = to.params.id;
      getUser();
      next();
    });

    return {
      user,
      getUser,
      tabs: dummyData.tabs,
    };
  },
};
</script>

<style scoped>
.nav-tabs {
  border: none;
}
.active {
  border-top: 1px solid black;
}
li {
  list-style-type: none;
}
.nav-link {
  color: #212529;
}
</style>