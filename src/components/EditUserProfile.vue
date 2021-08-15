<template>
  <h3 class="text-center pt-3 pb-2">編輯個人檔案</h3>
  <form @submit.prevent="handleSubmit" class="h-87">
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
            id="image"
            type="file"
            name="image"
            accept="image/*"
            class="form-control-file"
            @change="handleFileChange"
          />
        </div>
      </div>
      <div class="position-absolute w-100" style="bottom: 3%">
        <div class="text-center">
          <button type="submit" class="btn btn-primary">更新個人資料</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "EditUserProfile",
  props: {
    initialUser: {
      type: Object,
    },
  },
  setup(props) {
    const user = computed({
      get: () => props.initialUser,
    });

    let tempUserAvatar = ref("");

    const handleSubmit = function (e) {
      const form = e.target;
      const formData = new FormData(form);

      for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
        formData.delete(key);
      }
    };

    const handleFileChange = function (e) {
      const files = e.target.files;
      if (!files.length) return;
      const imageURL = window.URL.createObjectURL(files[0]);
      this.tempUserAvatar = imageURL;
    };

    return {
      user,
      tempUserAvatar,
      handleSubmit,
      handleFileChange,
    };
  },
};
</script>