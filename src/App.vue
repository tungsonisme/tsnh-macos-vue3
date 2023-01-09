<script setup lang="ts">
import MenuBar from './components/MenuBar/index.vue';
import Dock from './components/Dock/index.vue';
import LaunchedApps from './components/LaunchedApps/index.vue';
import DesktopPicture from './components/DesktopPicture/index.vue';
</script>

<template>
  <div class="app">
    <MenuBar />
    <DesktopPicture />
    <LaunchedApps />
    <Dock />
  </div>
</template>
