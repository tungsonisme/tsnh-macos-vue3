<script setup lang="ts">
import MenuBar from './components/MenuBar/index.vue';
import Dock from './components/Dock/index.vue';
import LaunchedApps from './components/LaunchedApps/index.vue';
</script>

<template>
  <div class="app">
    <MenuBar />
    <LaunchedApps />
    <Dock />
  </div>
</template>
