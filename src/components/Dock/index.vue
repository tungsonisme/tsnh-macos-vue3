<script lang="ts" setup>
import { useAppStore } from 'tsnh-macos-kernel';
const { apps, open } = useAppStore();
</script>

<template>
  <div class="dock">
    <div
      v-for="app in apps"
      :key="app.name"
      class="app-icon"
      @click="() => open(app.name)"
    >
      {{ app.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dock {
  background-color: rgba($color: white, $alpha: 0.6);
  color: white;
  position: fixed;
  bottom: 4px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 500px;
  height: $dock-height;
  border-radius: 12px;
  padding: 8px 6px;
  z-index: $tool-bar-z-index;
  display: flex;
  align-items: center;

  .app-icon {
    width: $dock-height;
    height: $dock-height;
    border-radius: 10px;
    background-color: black;
  }
}
</style>
