<script lang="ts" setup>
import { useAppStore } from 'tsnh-macos-kernel';

const { apps, launchedApps, open } = useAppStore();

// TODO: add app-active
// TODO: hover animation
// TODO: right click to open menu
// TODO: add System Preference
// TODO: add LaunchPad
// TODO: add Finder
</script>

<template>
  <div class="dock">
    <div
      v-for="app in apps.filter((item) => !item.hiddenInDock)"
      :key="app.name"
      class="app-icon-wrapper"
    >
      <div class="app-icon" @click="() => open(app.name)">
        <img v-if="app.icon?.length > 0" :src="app.icon" />
        <div v-else class="fake-icon"></div>
      </div>

      <div
        v-show="launchedApps.find((item) => item.appName === app.name)"
        class="app-active"
      ></div>
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

  .app-icon-wrapper {
    position: relative;
    margin-right: 10px;

    .app-icon {
      width: $dock-height;
      height: $dock-height;
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
      }

      .fake-icon {
        background-color: gray;
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }

    .app-active {
      width: 3px;
      height: 4px;
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translate(-50%, 0);
      background-color: black;
      border-radius: 50%;
    }
  }
}
</style>
