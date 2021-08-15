<template>
  <h3 class="text-center py-2 border-bottom">粉絲</h3>
  <div class="overflow-auto h-87">
    <div v-for="follower in followers" :key="follower.id" class="p-2 d-flex">
      <div class="me-3">
        <img class="userCard-avatar" :src="follower.avatar" alt="avatar" />
      </div>
      <div class="d-flex align-items-center">
        <div>
          <router-link
            class="rounded-pill"
            :to="{ name: 'user', params: { id: follower.id } }"
            @click="hideMask()"
          >
            {{ follower.name }}
          </router-link>
        </div>
        <!-- <div>
          <span>{{ follower.email }}</span>
        </div> -->
      </div>

      <!-- 自己頁面: 移除 or 已移除 -->
      <div v-if="isMyPage" class="ml-auto my-auto">
        <button
          v-if="!follower.isRemove"
          class="btn border"
          @click="removeFollower(follower.id)"
        >
          移除
        </button>
        <button v-else class="btn border" disabled>已移除</button>
      </div>

      <!-- 他人頁面: 追蹤 or 取消追蹤 -->
      <div v-else class="ml-auto my-auto">
        <button
          v-if="!follower.isFollowing"
          class="btn border btn-primary"
          @click="addFollowing(follower)"
        >
          追蹤
        </button>
        <button
          v-else
          class="btn border btn-danger"
          @click="removeFollowing(follower.id)"
        >
          取消追蹤
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "Followers",

  props: {
    initialFollowers: {
      type: Array,
    },
    initialFollowings: {
      type: Array,
    },
  },

  emits: [
    "after-remove-follower",
    "after-remove-following",
    "after-add-following",
    "hide-mask",
  ],

  setup(props, { emit }) {
    // vue-router 4.x 更改使用方法:
    // 原本: this.$route.params.id
    // 改為: 1. 引用 useRoute   2. 宣告 route   3. route.params.id
    const route = useRoute();

    let dummyData = reactive({
      currentUser: {
        id: 3,
        name: "User2",
        email: "User2@example.com",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      },

      followers: props.initialFollowers.map((follower) => {
        return {
          ...follower,
          isRemove: false,
          isFollowing: props.initialFollowings
            .map((f) => f.id)
            .includes(follower.id),
        };
      }),

      isMyPage: computed(() => {
        return Number(dummyData.currentUser.id) === Number(route.params.id)
          ? true
          : false;
      }),
    });

    const hideMask = () => {
      emit("hide-mask");
    };

    const removeFollower = (followerId) => {
      // 待串接 api

      // 更改按鈕文字: 移除 -> 已移除，disabled 按鈕
      dummyData.followers = dummyData.followers.map((follower) => {
        if (follower.id !== followerId) {
          return follower;
        } else {
          follower.isRemove = true;
          return follower;
        }
      });

      emit("after-remove-follower", followerId);
    };

    const removeFollowing = (followerId) => {
      // 待串接 api

      dummyData.followers = dummyData.followers.map((follower) => {
        if (follower.id !== followerId) {
          return follower;
        } else {
          follower.isFollowing = false;
          return follower;
        }
      });

      emit("after-remove-following", followerId);
    };

    const addFollowing = (user) => {
      // 待串接 api

      dummyData.followers = dummyData.followers.map((follower) => {
        if (follower.id !== user.id) {
          return follower;
        } else {
          follower.isFollowing = true;
          return follower;
        }
      });

      emit("after-add-following", user);
    };

    return {
      currentUser: dummyData.currentUser,
      followers: dummyData.followers,
      isMyPage: dummyData.isMyPage,
      hideMask,
      removeFollower,
      removeFollowing,
      addFollowing,
    };
  },
};
</script>