<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/20/solid';

const colorMode = useColorMode();

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>

<template>
  <button
    class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
    @click="toggleColorMode"
  >
    <ColorScheme placeholder="..." tag="span">
      <SunIcon v-if="colorMode.value === 'dark'" class="size-6" />
      <MoonIcon v-else class="size-6" />
    </ColorScheme>
  </button>
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0,0,0,0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
