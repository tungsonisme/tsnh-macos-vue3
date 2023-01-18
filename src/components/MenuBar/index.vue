<script setup lang="ts">
import { computed } from 'vue';
import MenuBarItem from './MenuBarItem.vue';
import { ExtendedMenuBarItemConfig } from '../../types/menuBar';
import {
  getAppIconMenuBarItemConfig,
  getBatteryMenuBarItemConfig,
  getTimeMenuBarItemConfig,
} from './helpers';
import useActiveTitle from './useActiveTitle';

const {
  activeTitle,
  menuBarRef,
  activeAppInfo,
  handleMenuBarItemClick,
  handleMenuBarItemMouseOver,
  handleDropdownClick,
} = useActiveTitle();

const leftMenuBarItemConfigs = computed((): ExtendedMenuBarItemConfig[] => {
  return [
    getAppIconMenuBarItemConfig(),
    ...(activeAppInfo.value.app && !activeAppInfo.value.app.hiddenInDock
      ? [
          {
            title: activeAppInfo.value.app.title,
            dropdownItems: activeAppInfo.value.app.mainDropdownItems ?? [],
            isAppName: true,
          } as ExtendedMenuBarItemConfig,
          ...(activeAppInfo.value.app.menuBarItems ?? []),
        ]
      : []),
  ];
});

const rightMenuBarItemConfigs = computed((): ExtendedMenuBarItemConfig[] => {
  return [getBatteryMenuBarItemConfig(), getTimeMenuBarItemConfig()];
});

// TODO: show time
// TODO: show battery
// TODO: show brightness slider
// TODO: show menu when clicking time
</script>

<template>
  <div ref="menuBarRef" class="menu-bar">
    <div class="menu-bar-left">
      <div class="menu-bar-items">
        <MenuBarItem
          v-for="itemConfig in leftMenuBarItemConfigs"
          :key="itemConfig.title"
          :active-title="activeTitle"
          :item-config="itemConfig"
          @click="handleMenuBarItemClick"
          @mouseover="handleMenuBarItemMouseOver"
          @dropdown-click="handleDropdownClick"
        />
      </div>
    </div>

    <div class="menu-bar-right">
      <MenuBarItem
        v-for="itemConfig in rightMenuBarItemConfigs"
        :key="itemConfig.title"
        :active-title="activeTitle"
        :item-config="itemConfig"
        @click="handleMenuBarItemClick"
        @mouseover="handleMenuBarItemMouseOver"
        @dropdown-click="handleDropdownClick"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-bar {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(32.5px);
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 24px);
  height: $menu-height;
  padding: 0 12px;
  z-index: $tool-bar-z-index;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-bar-items {
  display: flex;
  align-items: center;
}

.menu-bar-right {
  display: flex;
  align-items: center;

  > * {
    margin-left: 8px;
  }
}
</style>
