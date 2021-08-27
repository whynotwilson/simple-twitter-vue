<template>
  <div v-show="isMask !== ''">
    <Mask @hide-mask="hideMask" />
  </div>

  <div
    v-if="isMask === 'editUserProfile'"
    class="z-index-1090 bg-white mask-box p-2"
  >
    <EditUserProfile :initialUser="user" />
  </div>

  <div
    v-else-if="isMask === 'followers'"
    class="z-index-1090 bg-white mask-box"
  >
    <Followers
      :initialFollowers="followers"
      :initialFollowings="followings"
      :initialMyFollowings="myFollowings"
      @after-remove-follower="afterRemoveFollower"
      @after-remove-following="afterRemoveFollowing"
      @after-add-following="afterAddFollowing"
      @hide-mask="hideMask"
    />
  </div>

  <div
    v-else-if="isMask === 'followings'"
    class="z-index-1090 bg-white mask-box"
  >
    <Followings
      :initialFollowings="followings"
      :initialMyFollowings="myFollowings"
      @after-remove-following="afterRemoveFollowing"
      @after-add-following="afterAddFollowing"
      @hide-mask="hideMask"
    />
  </div>

  <main class="py-4 border-bottom">
    <div class="d-flex justify-content-center">
      <div class="me-2 d-none d-sm-block">
        <img class="rounded-pill w-100px" :src="user.avatar" alt="avatar" />
      </div>

      <div class="me-2 pt-2 d-block d-sm-none">
        <img class="rounded-pill img-77px" :src="user.avatar" alt="avatar" />
      </div>

      <div class="d-flex flex-column d-block d-sm-none ms-2">
        <div class="fs-3 btn cursor-default text-start">{{ user.name }}</div>
        <div>
          <button
            class="btn bg-#f0f2f5 border"
            @click="showMask('editUserProfile')"
            v-if="isMyPage"
          >
            編輯個人檔案
          </button>
          <a href="#" class="btn bg-#f0f2f5 border" v-else>發送訊息 </a>
        </div>
      </div>

      <div class="d-none d-sm-block ms-2">
        <div class="d-flex align-items-center">
          <span class="fs-3 me-3 btn cursor-default">{{ user.name }}</span>
          <button
            class="btn bg-#f0f2f5 border"
            @click="showMask('editUserProfile')"
            v-if="isMyPage"
          >
            編輯個人檔案
          </button>
          <a href="#" class="btn bg-#f0f2f5 border" v-else>發送訊息 </a>
        </div>
        <div>
          <button class="btn" @click="showMask('followers')">
            {{ followers.length }} 位追蹤者
          </button>
          <button class="btn" @click="showMask('followings')">
            {{ followings.length }} 位追蹤中
          </button>
        </div>
      </div>
    </div>
  </main>
  <div class="d-block d-sm-none border-bottom">
    <button class="btn" @click="showMask('followers')">
      {{ followers.length }} 位追蹤者
    </button>
    <button class="btn" @click="showMask('followings')">
      {{ followings.length }} 位追蹤中
    </button>
  </div>
</template>

<script>
import { reactive, ref, watch, computed, onMounted } from "vue";
import Mask from "./../components/Mask.vue";
import EditUserProfile from "./../components/EditUserProfile.vue";
import Followers from "./../components/Followers.vue";
import Followings from "./../components/Followings.vue";
import usersAPI from "./../apis/users.js";
import { Toast } from "./../utils/helpers.js";
import { useRoute, onBeforeRouteUpdate, useRouter } from "vue-router";

export default {
  name: "UserProfileCard",
  components: {
    Mask,
    EditUserProfile,
    Followers,
    Followings,
  },
  setup() {
    let dummyData = reactive({
      currentUser: {
        id: 3,
        name: "User2",
        email: "User2@example.com",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      },
    });

    let user = ref({});
    let followers = ref([]);
    let followings = ref([]);
    const route = useRoute();
    const userId = route.params.id;
    const router = useRouter();
    let myFollowings = ref([]);

    const getUser = async (userId) => {
      try {
        const { data } = await usersAPI.getUser({ userId });
        if (data.status === "error") {
          throw data.message;
        }
        user.value = data;
        followers.value = data.Followers;
        followings.value = data.Followings;
      } catch (error) {
        if (error === "查詢無該用戶") {
          router.push({ name: "not-exist" });
        } else {
          Toast.fire({
            icon: "error",
            title: "無法取得用戶資料，請稍後再試",
          });
          console.log("Error: ", error);
        }
      }
    };

    const getMyFollowings = async () => {
      try {
        const { data } = await usersAPI.getMyFollowings();
        if (!data) {
          throw new Error(data.message);
        }
        myFollowings.value = data.Followings;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得用戶資料，請稍後再試",
        });

        console.log("Error: ", error);
      }
    };

    onMounted(() => {
      getUser(userId);
      getMyFollowings();
    });

    let isMask = ref("");

    // 彈出遮罩時禁止底層頁面滾動
    watch(isMask, (oldValue, newValue) => {
      if (!newValue) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
    const showMask = (key) => {
      isMask.value = key;
    };

    const hideMask = () => {
      isMask.value = "";
    };

    const isMyPage = computed(() => {
      return dummyData.currentUser.id === user.value.id ? true : false;
    });

    onBeforeRouteUpdate((to, from, next) => {
      getUser(to.params.id);
      next();
    });

    return {
      isMask,
      showMask,
      hideMask,
      currentUser: dummyData.currentUser,
      user,
      followers,
      followings,
      isMyPage,
      myFollowings,
    };
  },

  methods: {
    afterRemoveFollower(followerId) {
      this.followers = this.followers.filter((follower) => {
        return follower.id !== followerId;
      });
    },

    afterRemoveFollowing(followingId) {
      if (Number(this.$route.params.id) === Number(this.currentUser.id)) {
        this.followings = this.followings.filter((following) => {
          return following.id !== followingId;
        });
      }
    },

    afterAddFollowing(user) {
      if (Number(this.$route.params.id) === Number(this.currentUser.id)) {
        this.followings.push(user);
      }
    },
  },
};
</script>

<style>
a:hover {
  text-decoration: none;
  color: black;
}
.mask-bg {
  position: fixed;
  z-index: 1080;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}
.mask-box {
  position: fixed;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  height: 500px;
  min-width: 280px;
  max-width: 400px;
}
.editProfile-avatar {
  height: 150px;
  width: 150px;
}
.cursor-default {
  cursor: default;
}
.userCard-avatar {
  height: 40px;
  width: 40px;
  border-radius: 25px;
}
.w-100px {
  width: 100px;
  height: 100px;
}
.z-index-1090 {
  z-index: 1090;
}
.h-87 {
  height: 87%;
}
.img-77px {
  max-width: 77px;
  max-height: 77px;
}
</style>
