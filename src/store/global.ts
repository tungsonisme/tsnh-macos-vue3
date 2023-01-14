import { ref } from 'vue';
import { defineStore } from 'pinia';

const useGlobalStore = defineStore('global', () => {
  const appState = ref<'boot' | 'locked' | 'active' | 'sleep' | 'screenSaver'>(
    'boot'
  );

  function login() {
    appState.value = 'active';
  }

  function sleep() {
    appState.value = 'sleep';
  }

  function locksScreen() {
    appState.value = 'locked';
  }

  function activateScreenSaver() {
    appState.value = 'screenSaver';
  }

  return {
    // state
    appState,
    // getters
    // actions
    login,
    sleep,
    locksScreen,
    activateScreenSaver,
  };
});

export default useGlobalStore;
