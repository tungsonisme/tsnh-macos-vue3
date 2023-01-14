<script lang="ts" setup>
import { onMounted } from 'vue';
import loadAssets from '../../helpers/loadAssets';
import useGlobalStore from '../../store/global';

const { locksScreen } = useGlobalStore();

onMounted(async () => {
  await Promise.all([
    loadAssets(),
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    }),
  ]);

  locksScreen();
});
</script>

<template>
  <div class="boot-up-screen">
    <img src="../../assets/icons/apple.svg" />
  </div>
</template>

<style lang="scss" scoped>
.boot-up-screen {
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 100px;
    height: 100px;
  }
}
</style>
