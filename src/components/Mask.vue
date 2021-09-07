<template>
  <!-- 遮罩背景(關燈) -->
  <div>
    <div class="mask-bg" @click.prevent="hideMask()"></div>
  </div>
</template>

<script>
export default {
  name: "Mask",
  emits: ["hide-mask"],

  setup(props, { emit }) {
    const hideMask = () => {
      emit("hide-mask");
    };

    return { hideMask };
  },
};
</script>

<style>
.mask-bg {
  position: fixed;
  z-index: 1080;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}
</style>
