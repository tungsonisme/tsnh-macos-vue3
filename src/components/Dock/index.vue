<script lang="ts" setup>
import { useAppStore } from 'tsnh-macos-kernel';
const { apps, open } = useAppStore();
</script>

<template>
  <div class="dock">
    <div v-for="app in apps" :key="app.name" @click="() => open(app.name)">
      {{ app.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dock {
  background-color: #242424;
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
</style>
