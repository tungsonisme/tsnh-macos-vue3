<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { MacosWindow } from 'tsnh-macos-kernel';
</script>

<template>
  <HelloWorld msg="New Host App v3" />
  <MacosWindow msg="Host App Macos Window" />
  <PokemonApp />
  <PokemonSetting />
</template>
