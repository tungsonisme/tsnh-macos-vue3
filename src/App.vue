<script setup lang="ts">
import useGlobalStore from './store/global';
import MenuBar from './components/MenuBar/index.vue';
import Dock from './components/Dock/index.vue';
import LaunchedApps from './components/LaunchedApps/index.vue';
import DesktopPicture from './components/DesktopPicture/index.vue';
import BootUpScreen from './components/BootUpScreen/index.vue';
import LockScreen from './components/LockScreen/index.vue';
import { storeToRefs } from 'pinia';

const store = useGlobalStore();
const { appState } = storeToRefs(store);

// TODO: show lock screen
// TODO: show sleep screen
// TODO: show screen save screen
</script>

<template>
  <div class="app">
    <template v-if="appState === 'boot'">
      <BootUpScreen />
    </template>

    <template v-else-if="appState === 'locked'">
      <DesktopPicture />
      <LockScreen />
    </template>

    <template v-else-if="appState === 'active'">
      <MenuBar />
      <DesktopPicture />
      <LaunchedApps />
      <Dock />
    </template>
  </div>
</template>
