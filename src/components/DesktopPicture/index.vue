<script lang="ts" setup>
import { useAppStore } from 'tsnh-macos-kernel';

const { focus } = useAppStore();
</script>

<template>
  <div class="desktop-picture" @click="() => focus(undefined)" />
</template>

<style lang="scss" scoped>
.desktop-picture {
  background-image: url('../../assets/images/desktopPicture.jpg');
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: $desktop-picture-z-index;
}
</style>
