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

export default {
  name: "NavTabs",
  setup() {
    let dummyData = reactive({
      currentUser: {
        id: 3,
        name: "User2",
        email: "User2@example.com",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      },

      user: {
        id: 3,
        email: "user2@example.com",
        name: "user2",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg",
        introduction:
          "Nam dignissimos molestiae vero quibusdam in dolor at nulla nesciunt. Consequuntur eaque beatae et et. Pariatur neque placeat ab suscipit sit. At ut commodi rerum blanditiis animi ratione atque nam. Nostrum eum exercitationem sunt similique esse facere et voluptatem modi. Labore architecto corporis at sunt omnis assumenda numquam.",
        role: "user",
        createdAt: "2021-04-22T13:07:01.000Z",
        updatedAt: "2021-04-22T13:07:01.000Z",
      },

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

    return {
      currentUser: dummyData.currentUser,
      user: dummyData.user,
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