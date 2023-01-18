<script lang="ts" setup>
import { useAppStore } from 'tsnh-macos-kernel';
import { computed } from 'vue';
import VueApp from './VueApp.vue';
import ReactApp from './ReactApp.vue';

const { apps, launchedApps } = useAppStore();

const vueLaunchedApps = computed(() => {
  return launchedApps.filter(
    (item) => apps.find((app) => app.name === item.appName)?.type === 'vue'
  );
});

const reactLaunchedApps = computed(() => {
  return launchedApps.filter(
    (item) => apps.find((app) => app.name === item.appName)?.type === 'react'
  );
});
</script>

<template>
  <div class="launched-apps">
    <div v-for="app in vueLaunchedApps" :key="app.instances[0].id">
      <VueApp
        :app-name="app.instances[0].launchedAppName"
        :component="app.instances[0].component"
      ></VueApp>
    </div>

    <div v-for="app in reactLaunchedApps" :key="app.instances[0].id">
      <ReactApp
        :app-name="app.instances[0].launchedAppName"
        :component="app.instances[0].component"
      ></ReactApp>
    </div>
  </div>
</template>
