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
import { reactive, ref, watch, computed } from "vue";
import Mask from "./../components/Mask.vue";
import EditUserProfile from "./../components/EditUserProfile.vue";

export default {
  name: "UserProfileCard",
  components: {
    Mask,
    EditUserProfile,
  },
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

      followers: [
        {
          id: 4,
          email: "user3@example.com",
          name: "user3",
          avatar: "https://uifaces.co/our-content/donated/QrZO-QjT.jpg",
          introduction: "omnis architecto repellendus",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 15,
            followerId: 4,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          name: "user4",
          avatar:
            "https://images.unsplash.com/photo-1549019421-b52ab378d5df?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
          introduction:
            "Ut veritatis enim nobis pariatur.\nItaque omnis quo exercitationem libero voluptates adipisci voluptas repellat distinctio.",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 16,
            followerId: 5,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 6,
          email: "user5@example.com",
          name: "user5",
          avatar:
            "https://m.media-amazon.com/images/M/MV5BMTUyMDgxNDYxOV5BMl5BanBnXkFtZTgwMTExMDEwMDI@._V1_UY256_CR9,0,172,256_AL_.jpg",
          introduction:
            "Rerum dolor nulla deleniti et reiciendis. Ipsum debitis repudiandae rerum quasi totam dolor. Minus ab fugit et dolorum repellat nobis unde sequi aut. Dolor perferendis iusto enim dolor.",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 17,
            followerId: 6,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 7,
          email: "user6@example.com",
          name: "user6",
          avatar:
            "https://images.unsplash.com/photo-1542131596-52b8276764bb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
          introduction:
            "Nihil non maxime est iusto autem. Vel culpa totam ut doloremque totam minus nostrum molestiae sed. Culpa qui alias et ut. Quasi consequatur sapiente dolor occaecati. Omnis dignissimos necessitatibus tempora quam sed dolore natus. Possimus consequatur sit in tempore et fuga commodi officia.\n \rMaiores architecto velit tempore voluptatem. Rem ratione omnis corrupti reiciendis aut illo dolor eveniet quaerat. Aut ducimus aut. Molestiae nobis ea assumenda nobis eius aspernatur.\n \rQuis vitae velit velit tempora sed in quasi commodi. Debitis eos eos. Perferendis quod excepturi vitae excepturi. Aut vel aut exercitationem.",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 18,
            followerId: 7,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 8,
          email: "user7@example.com",
          name: "user7",
          avatar:
            "https://m.media-amazon.com/images/M/MV5BMjEyNzg2NTM4MV5BMl5BanBnXkFtZTgwMzcxNzMwNjE@._V1_UX172_CR0,0,172,256_AL_.jpg",
          introduction:
            "Minima sunt sint consequatur non.\nAccusamus impedit et voluptatem ipsam.\nVeritatis alias velit vel quaerat voluptatem.\nEt debitis tenetur id quos ipsam dolor sed blanditiis.",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 19,
            followerId: 8,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 9,
          email: "user8@example.com",
          name: "user8",
          avatar:
            "https://images.generated.photos/QbcqC7vbdYI9lI-q6inuEaCPd_yC4v7OkPMqCdWk-tM/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zLzA5/OTk2NjMuanBn.jpg",
          introduction: "saepe minus voluptatem",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 20,
            followerId: 9,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 10,
          email: "user9@example.com",
          name: "user9",
          avatar:
            "https://images.generated.photos/xoDRbc-MFj6oLyimW39p3Q_uw6FbuGxEbF-H7Rpg0Hg/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zLzA5/NTIxMTkuanBn.jpg",
          introduction:
            "Autem tempora qui voluptatum veniam perspiciatis dolorem tenetur voluptas. Consequatur qui praesentium aliquid animi maiores maxime magnam explicabo. Blanditiis quis ex quae. Laudantium dolorem laboriosam velit magnam eius dolorum iusto repellendus maxime. Sed dolor itaque vel in ut aut magnam quos labore.",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 21,
            followerId: 10,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 11,
          email: "user10@example.com",
          name: "user10",
          avatar: "https://randomuser.me/api/portraits/men/59.jpg",
          introduction:
            "Eligendi enim quis culpa. Ullam nulla dolore. Quis aliquam quia aspernatur et labore. Voluptatum sapiente delectus fugiat totam.\n \rIpsam ex voluptatem est quia ut quis consequatur quia. Rem et et hic omnis recusandae autem. Cum facilis ut repellendus fuga sequi similique enim.\n \rOmnis quia suscipit eveniet. Beatae labore quas officia dolor doloremque iure. Doloribus minima aperiam sit velit adipisci saepe ducimus mollitia.",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 22,
            followerId: 11,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 12,
          email: "user11@example.com",
          name: "user11",
          avatar:
            "https://m.media-amazon.com/images/M/MV5BOTY5ZGE5ZjItOGMwMi00NWUxLWI0NTctYzgxM2MxOTcwMzViXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_UY256_CR15,0,172,256_AL_.jpg",
          introduction:
            "Ullam qui accusantium. Voluptate velit est est. Nisi quaerat aut nisi nisi.\n \rEt non occaecati doloremque. Nisi molestias ea cum et. Sint officiis magni exercitationem voluptate libero sed molestiae. Voluptatibus eius voluptatum quo earum. Impedit qui expedita. Voluptatibus sed suscipit.\n \rQui hic perferendis pariatur eius eum harum maxime quam. Fugiat repellendus et est quia ea pariatur modi facere. Ullam aut aut ea.",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 23,
            followerId: 12,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 13,
          email: "user12@example.com",
          name: "user12",
          avatar: "https://uifaces.co/our-content/donated/Xp0NB-TL.jpg",
          introduction: "optio",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 24,
            followerId: 13,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 14,
          email: "user13@example.com",
          name: "user13",
          avatar: "https://uifaces.co/our-content/donated/OhnNSaUi.jpg",
          introduction:
            "Dignissimos ad eos.\nEos repellat sed consequuntur nobis.",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 25,
            followerId: 14,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 15,
          email: "user14@example.com",
          name: "user14",
          avatar:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3Nzg2NjA1OF5BMl5BanBnXkFtZTgwMjY5NTU1MzI@._V1_UY256_CR8,0,172,256_AL_.jpg",
          introduction:
            "Repellendus molestias similique error aut tenetur qui sed sapiente commodi. Excepturi et animi sapiente corrupti itaque pariatur. Consequatur minus deleniti. Quaerat qui impedit quibusdam perferendis dolores. Ut modi fugit dolorem in modi sapiente.\n \rRerum eveniet sint. Voluptatibus ab sapiente et laboriosam. Eaque aut cum architecto quia. Optio iste sit consequatur.\n \rNostrum necessitatibus recusandae. Delectus sit ab odit dolorem unde ratione laudantium. Corporis deserunt repellat quasi repellendus est porro eligendi sequi ducimus.",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 26,
            followerId: 15,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 16,
          email: "user15@example.com",
          name: "user15",
          avatar: "https://uifaces.co/our-content/donated/uKeSMzeK.jpg",
          introduction: "excepturi et aut",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 27,
            followerId: 16,
            followingId: 3,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
      ],

      followings: [
        {
          id: 2,
          email: "user1@example.com",
          name: "user1",
          avatar: "https://i.imgur.com/vKBxTj7.jpg",
          introduction: "incidunt",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 8,
            followerId: 10,
            followingId: 2,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 4,
          email: "user3@example.com",
          name: "user3",
          avatar: "https://uifaces.co/our-content/donated/QrZO-QjT.jpg",
          introduction: "omnis architecto repellendus",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 33,
            followerId: 10,
            followingId: 4,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 5,
          email: "user4@example.com",
          name: "user4",
          avatar:
            "https://images.unsplash.com/photo-1549019421-b52ab378d5df?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
          introduction:
            "Ut veritatis enim nobis pariatur.\nItaque omnis quo exercitationem libero voluptates adipisci voluptas repellat distinctio.",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 44,
            followerId: 10,
            followingId: 5,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 6,
          email: "user5@example.com",
          name: "user5",
          avatar:
            "https://m.media-amazon.com/images/M/MV5BMTUyMDgxNDYxOV5BMl5BanBnXkFtZTgwMTExMDEwMDI@._V1_UY256_CR9,0,172,256_AL_.jpg",
          introduction:
            "Rerum dolor nulla deleniti et reiciendis. Ipsum debitis repudiandae rerum quasi totam dolor. Minus ab fugit et dolorum repellat nobis unde sequi aut. Dolor perferendis iusto enim dolor.",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 54,
            followerId: 10,
            followingId: 6,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 7,
          email: "user6@example.com",
          name: "user6",
          avatar:
            "https://images.unsplash.com/photo-1542131596-52b8276764bb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
          introduction:
            "Nihil non maxime est iusto autem. Vel culpa totam ut doloremque totam minus nostrum molestiae sed. Culpa qui alias et ut. Quasi consequatur sapiente dolor occaecati. Omnis dignissimos necessitatibus tempora quam sed dolore natus. Possimus consequatur sit in tempore et fuga commodi officia.\n \rMaiores architecto velit tempore voluptatem. Rem ratione omnis corrupti reiciendis aut illo dolor eveniet quaerat. Aut ducimus aut. Molestiae nobis ea assumenda nobis eius aspernatur.\n \rQuis vitae velit velit tempora sed in quasi commodi. Debitis eos eos. Perferendis quod excepturi vitae excepturi. Aut vel aut exercitationem.",
          role: "user",
          createdAt: "2021-04-22T08:06:05.000Z",
          updatedAt: "2021-04-22T08:06:05.000Z",
          Followship: {
            id: 63,
            followerId: 10,
            followingId: 7,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 8,
          email: "user7@example.com",
          name: "user7",
          avatar:
            "https://m.media-amazon.com/images/M/MV5BMjEyNzg2NTM4MV5BMl5BanBnXkFtZTgwMzcxNzMwNjE@._V1_UX172_CR0,0,172,256_AL_.jpg",
          introduction:
            "Minima sunt sint consequatur non.\nAccusamus impedit et voluptatem ipsam.\nVeritatis alias velit vel quaerat voluptatem.\nEt debitis tenetur id quos ipsam dolor sed blanditiis.",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 71,
            followerId: 10,
            followingId: 8,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
        {
          id: 9,
          email: "user8@example.com",
          name: "user8",
          avatar:
            "https://images.generated.photos/QbcqC7vbdYI9lI-q6inuEaCPd_yC4v7OkPMqCdWk-tM/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zLzA5/OTk2NjMuanBn.jpg",
          introduction: "saepe minus voluptatem",
          role: "user",
          createdAt: "2021-04-22T08:06:06.000Z",
          updatedAt: "2021-04-22T08:06:06.000Z",
          Followship: {
            id: 78,
            followerId: 10,
            followingId: 9,
            createdAt: "2021-04-22T08:05:58.000Z",
            updatedAt: "2021-04-22T08:05:58.000Z",
          },
        },
      ],
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

    return {
      isMask,
      showMask,
      hideMask,
      currentUser: dummyData.currentUser,
      user: dummyData.user,
      followers: dummyData.followers,
      followings: dummyData.followings,
      isMyPage,
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
