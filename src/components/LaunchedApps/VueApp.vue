<script lang="ts" setup>
import { MacosWindow } from 'tsnh-macos-kernel';
import { capitalizeFirstLetter } from '../../helpers/string';

const props = defineProps<{
  appName: string;
  component: string;
}>();

const componentName = `${capitalizeFirstLetter(
  props.appName
)}${capitalizeFirstLetter(props.component)}`;
</script>

<template>
  <MacosWindow :app-name="props.appName">
    <component :is="componentName" />
  </MacosWindow>
</template>
