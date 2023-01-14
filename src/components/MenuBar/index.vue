<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAppStore } from 'tsnh-macos-kernel';
import MenuBarItem from './MenuBarItem.vue';
import { ExtendedMenuBarItemConfig } from '../../types/menuBar';
import { getAppIconMenuBarItemConfig } from './helpers';

const activeTitle = ref<string>();
const menuBarRef = ref<HTMLDivElement>();

const store = useAppStore();
const { activeAppInfo } = storeToRefs(store);

watch(activeAppInfo, () => {
  activeTitle.value = undefined;
});

const menuBarItemConfigs = computed((): ExtendedMenuBarItemConfig[] => {
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

function handleMenuBarItemClick(title: string) {
  activeTitle.value = title;
}

function handleMenuBarItemMouseOver(title: string) {
  if (activeTitle.value) {
    activeTitle.value = title;
  }
}

function handleDocumentClick(e: Event) {
  if (!menuBarRef.value?.contains(e.target as HTMLElement)) {
    activeTitle.value = undefined;
  }
}

function handleDropdownClick() {
  activeTitle.value = undefined;
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});

// TODO: show focus app
// TODO: show time
// TODO: show battery
// TODO: show brightness slider
// TODO: show menu when clicking time
</script>

<template>
  <div ref="menuBarRef" class="menu-bar">
    <MenuBarItem
      v-for="itemConfig in menuBarItemConfigs"
      :key="itemConfig.title"
      :active-title="activeTitle"
      :item-config="itemConfig"
      @click="handleMenuBarItemClick"
      @mouseover="handleMenuBarItemMouseOver"
      @dropdown-click="handleDropdownClick"
    />
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
  width: 100vw;
  height: $menu-height;
  padding: 0 12px;
  z-index: $tool-bar-z-index;
  display: flex;
  align-items: center;
}
</style>
