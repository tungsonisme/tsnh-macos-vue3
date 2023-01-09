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
  color: white;
  position: fixed;
  bottom: 4px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 500px;
  height: $dock-height;
  padding: 6px 8px;
  z-index: $tool-bar-z-index;
  display: flex;
  align-items: center;
  background: rgba(244, 245, 245, 0.6);
  border: 0.5px solid #f4f5f5;
  border-radius: 16px;

  .app-icon {
    width: $dock-height;
    height: $dock-height;
    border-radius: 10px;
    background-color: black;
  }
}
</style>
