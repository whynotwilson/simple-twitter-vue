<template>
  <h3 class="text-center pt-3 pb-2">編輯個人檔案</h3>
  <form
    @submit.prevent="handleSubmit"
    class="h-87"
    enctype="multipart/form-data"
  >
    <div class="flex h-100">
      <div class="form-group row">
        <label for="name" class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            v-model.lazy="user.name"
          />
        </div>
        <!-- <label for="intro" class="col-sm-2 col-form-label">簡介</label>
        <div class="col-sm-10">
          <input
            type="text"
            name="intro"
            class="form-control"
            id="intro"
            v-model="user.introduction"
          />
        </div> -->
        <div class="form-group">
          <img
            :src="tempUserAvatar || user.avatar"
            class="d-block img-thumbnail my-3 editProfile-avatar"
          />

          <input
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            class="form-control-file"
            @change="handleFileChange"
          />
        </div>
      </div>
      <div class="position-absolute w-100" style="bottom: 3%">
        <div class="text-center">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isProcessing"
          >
            更新個人資料
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, ref, inject } from "vue";
import { Toast } from "./../utils/helpers.js";
import usersAPI from "./../apis/users.js";
import { useStore } from "vuex";

export default {
  name: "EditUserProfile",
  emits: ["after-edit-user"],
  props: {
    initialUser: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const user = computed({
      get: () => props.initialUser,
    });

    const store = useStore();

    let tempUserAvatar = ref("");
    let isProcessing = ref(false);
    const updateIsUserEdited = inject("updateIsUserEdited");

    const handleSubmit = async (e) => {
      try {
        if (!user.value.name) {
          Toast.fire({
            icon: "warning",
            title: "您尚未填寫姓名",
          });
          return;
        }

        const form = e.target;
        const formData = new FormData(form);

        isProcessing.value = true;
        const { data } = await usersAPI.putUser({
          formData,
          userId: user.value.id,
        });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        isProcessing.value = false;

        Toast.fire({
          icon: "success",
          title: "成功編輯個人檔案",
        });

        store.commit("setCurrentUser", {
          avatar: tempUserAvatar.value || user.value.avatar,
          name: user.value.name,
        });
        updateIsUserEdited(true);
        emit("after-edit-user", { avatar: tempUserAvatar });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法編輯個人檔案，請稍後再試",
        });

        isProcessing.value = false;
        console.log("Error: ", error);
        emit("after-edit-user", { avatar: "" });
      }
    };

    const handleFileChange = function(e) {
      const files = e.target.files;
      if (!files.length) return;
      const imageURL = window.URL.createObjectURL(files[0]);
      this.tempUserAvatar = imageURL;
    };

    return {
      user,
      isProcessing,
      tempUserAvatar,
      handleSubmit,
      handleFileChange,
    };
  },
};
</script>
