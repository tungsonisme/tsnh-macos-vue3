<script lang="ts" setup>
import { useAppStore, MacosWindow } from 'tsnh-macos-kernel';

const { launchedApps } = useAppStore();
</script>

<template>
  <div class="launched-apps">
    <div v-for="app in launchedApps" :key="app.instances[0].id">
      <MacosWindow :app-name="app.instances[0].launchedAppName">
        <component :is="app.instances[0]?.component" />
      </MacosWindow>
    </div>
  </div>
</template>
