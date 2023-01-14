<script lang="ts" setup>
import useGlobalStore from '../../store/global';

const { login } = useGlobalStore();
</script>

<template>
  <div class="lock-screen">
    <div class="lock-screen-inner" @click="login">
      <img src="../../assets/images/profilePicture.jpg" />
      <div class="username">Sean Nguyen</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lock-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $lock-screen;

  .lock-screen-inner {
    margin-top: -130px;
    cursor: pointer;
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.15))
      drop-shadow(0 12px 15px rgba(0, 0, 0, 0.35));
  }

  .username {
    color: $white;
    text-align: center;
    margin-top: 35px;
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
