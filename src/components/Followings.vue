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
import usersAPI from "./../apis/users.js";
import { Toast } from "./../utils/helpers.js";
import { mapState, useStore } from "vuex";

export default {
  name: "Followings",

  props: {
    initialFollowings: {
      type: Array,
    },
    initialMyFollowings: {
      type: Array,
    },
  },

  emits: ["after-remove-following", "after-add-following", "hide-mask"],

  setup(props, { emit }) {
    let followingsData = reactive({
      followings: props.initialFollowings.map((following) => {
        return {
          ...following,
          isFollowing: props.initialMyFollowings
            .map((f) => f.id)
            .includes(following.id),
        };
      }),
    });

    const store = useStore();

    const hideMask = () => {
      emit("hide-mask");
    };

    const removeFollowing = async (followingId) => {
      try {
        const { data } = await usersAPI.deleteFollowShip({
          followerId: store.state.currentUser.id,
          followingId,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        followingsData.followings = followingsData.followings.map(
          (following) => {
            if (following.id !== followingId) {
              return following;
            } else {
              following.isFollowing = false;
              return following;
            }
          }
        );

        emit("after-remove-following", followingId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });

        console.log("Error: ", error);
      }
    };

    const addFollowing = async (user) => {
      try {
        const { data } = await usersAPI.addFollowing({
          followingId: user.id,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        followingsData.followings = followingsData.followings.map(
          (following) => {
            if (following.id !== user.id) {
              return following;
            } else {
              following.isFollowing = true;
              return following;
            }
          }
        );

        emit("after-add-following", user);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試",
        });

        console.log("Error: ", error);
      }
    };

    return {
      followings: followingsData.followings,
      hideMask,
      removeFollowing,
      addFollowing,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>
