<script lang="ts" setup>
import { MacosWindow } from 'tsnh-macos-kernel';
import { onMounted, ref } from 'vue';
import { fetchReactComponent } from './helpers';

const reactComponent = ref<unknown>(null);

const props = defineProps<{
  appName: string;
  component: string;
}>();

onMounted(async () => {
  reactComponent.value = await fetchReactComponent(
    `${props.appName}/${props.component}`
  );
});
</script>

<template>
  <MacosWindow :app-name="props.appName">
    <div v-html="reactComponent"></div>
  </MacosWindow>
</template>
