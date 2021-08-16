<template>
  <h3 class="text-center py-2 border-bottom">追蹤名單</h3>
  <div class="overflow-auto h-87">
    <div v-for="following in followings" :key="following.id" class="p-2 d-flex">
      <div class="me-3">
        <img class="userCard-avatar" :src="following.avatar" alt="avatar" />
      </div>
      <div class="d-flex align-items-center">
        <div>
          <router-link
            class="rounded-pill"
            :to="{ name: 'user', params: { id: following.id } }"
            @click="hideMask()"
          >
            {{ following.name }}
          </router-link>
        </div>
        <!-- <div>
          <span>{{ following.email }}</span>
        </div> -->
      </div>
      <div class="ml-auto my-auto">
        <button
          v-if="following.isFollowing"
          class="btn border btn-danger"
          @click="removeFollowing(following.id)"
        >
          取消追蹤
        </button>
        <button
          v-else
          class="btn border btn-primary"
          @click="addFollowing(following)"
        >
          追蹤
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "Followings",

  props: {
    initialFollowings: {
      type: Array,
    },
  },

  emits: ["after-remove-following", "after-add-following", "hide-mask"],

  setup(props, { emit }) {
    let data = reactive({
      followings: props.initialFollowings.map((following) => {
        return {
          ...following,
          isFollowing: props.initialFollowings
            .map((f) => f.id)
            .includes(following.id),
        };
      }),
    });

    const hideMask = () => {
      emit("hide-mask");
    };

    const removeFollowing = (followingId) => {
      // 待串接 api

      data.followings = data.followings.map((following) => {
        if (following.id !== followingId) {
          return following;
        } else {
          following.isFollowing = false;
          return following;
        }
      });

      emit("after-remove-following", followingId);
    };

    const addFollowing = (user) => {
      // 待串接 api

      data.followings = data.followings.map((following) => {
        if (following.id !== user.id) {
          return following;
        } else {
          following.isFollowing = true;
          return following;
        }
      });

      emit("after-add-following", user);
    };

    return {
      followings: data.followings,
      hideMask,
      removeFollowing,
      addFollowing,
    };
  },
};
</script>