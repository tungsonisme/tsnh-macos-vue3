<script setup lang="ts">
import { MenuBarDropdownItem } from 'tsnh-macos-kernel';
import { computed } from 'vue';
import { ExtendedMenuBarItemConfig } from '../../types/menuBar';

const props = defineProps<{
  activeTitle?: string;
  itemConfig: ExtendedMenuBarItemConfig;
}>();

const emit = defineEmits<{
  (e: 'click', title: string): void;
  (e: 'mouseover', title: string): void;
  (e: 'dropdownClick'): void;
}>();

const isActive = computed(() => props.activeTitle === props.itemConfig.title);

const isShowDropdown = computed(
  () => isActive.value && props.itemConfig.dropdownItems?.length
);

function handleDropdownClick(item: MenuBarDropdownItem) {
  item.onClick?.();
  emit('dropdownClick');
}
</script>

<template>
  <div
    class="menu-bar-item"
    :class="{ active: isActive }"
    @click="() => emit('click', props.itemConfig.title)"
    @mouseover="() => emit('mouseover', props.itemConfig.title)"
  >
    <div v-if="props.itemConfig.icon" class="img-wrapper">
      <img :src="props.itemConfig.icon" />
    </div>
    <div
      v-else
      class="text-wrapper"
      :class="{ 'app-name': props.itemConfig.isAppName }"
    >
      {{ props.itemConfig.title }}
    </div>

    <div v-if="isShowDropdown" class="dropdown">
      <div
        v-for="(section, index) in props.itemConfig.dropdownItems"
        :key="index"
        class="dropdown-section"
      >
        <div
          v-for="item in section"
          :key="item.title"
          class="dropdown-item"
          @click="() => handleDropdownClick(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-bar-item {
  padding: 0 10px;
  border-radius: 4px;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.active {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &:not(:first-child) {
    margin-left: -4px;
  }
}

.img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-wrapper {
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  line-height: $menu-height;
  color: rgba(255, 255, 255, 0.9);

  &.app-name {
    font-weight: bold;
  }
}

.dropdown {
  position: absolute;
  min-width: 150px;
  top: 100%;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 6px;
  white-space: nowrap;
  border: 0.5px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  font-weight: 500;
  font-size: 13px;
  color: #3d3d3d;
  opacity: 0.9;
}

.dropdown-section {
  padding: 0 0 6px;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(60, 60, 67, 0.18);
  }

  &:not(:first-child) {
    padding-top: 6px;
  }

  &:last-child {
    padding: 0;
    padding-top: 6px;
  }
}

.dropdown-item {
  border-radius: 4px;
  padding: 0 8px;
  cursor: default;

  &:hover {
    background: $blue;
    color: white;
  }
}
</style>
