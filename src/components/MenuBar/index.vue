<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import {
  useAppStore,
  MenuBarItem as MenuBarItemConfig,
} from 'tsnh-macos-kernel';
import MenuBarItem from './MenuBarItem.vue';
import appleIcon from '../../assets/icons/apple.svg';

const activeTitle = ref<string>();
const menuBarRef = ref<HTMLDivElement>();

const { activeAppInfo } = useAppStore();
watch(activeAppInfo, () => {
  activeTitle.value = '';
});

const menuBarItemConfigs: MenuBarItemConfig[] = activeAppInfo.app
  ? [
      {
        title: activeAppInfo.app.name,
        dropdownItems: activeAppInfo.app.mainDropdownItems ?? [],
      },
      ...(activeAppInfo.app.menuBarItems ?? []),
    ]
  : [
      {
        title: 'Apple Icon',
        icon: appleIcon,
        dropdownItems: [
          [
            {
              title: 'About this Mac',
              onClick: () => {
                console.log('About this Mac');
              },
            },
          ],
          [
            {
              title: 'Restart',
              onClick: () => {
                console.log('Restart');
              },
            },
            {
              title: 'Sleep',
              onClick: () => {
                console.log('Sleep');
              },
            },
          ],
        ],
      },
    ];

const handleMenuBarItemClick = (title: string) => {
  activeTitle.value = title;
};

const handleMenuBarItemMouseOver = (title: string) => {
  if (activeTitle.value) {
    activeTitle.value = title;
  }
};

const handleDocumentClick = (e: Event) => {
  if (!menuBarRef.value?.contains(e.target as HTMLElement)) {
    activeTitle.value = undefined;
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick);
});
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
