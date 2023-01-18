<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getTime } from './helpers';

const time = ref(getTime());

onMounted(() => {
  setTimeout(() => {
    time.value = getTime();
  }, 1000);
});
</script>

<template>
  <div class="menu-bar-time">{{ time }}</div>
</template>
