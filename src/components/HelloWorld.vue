<script setup lang="ts">
import { useAppStore } from 'tsnh-macos-kernel';

defineProps<{ msg: string }>();

const store = useAppStore();
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>Count: {{ store.count }}</h1>
  <h1 @click="() => store.increment()">Increase</h1>
</template>
