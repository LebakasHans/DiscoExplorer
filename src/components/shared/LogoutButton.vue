<script setup lang="ts">
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';

function logout() {
  useCookie('token').value = null;
  navigateTo('/login');
}
</script>

<template>
  <button
    class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
    @click="logout"
  >
    <ArrowRightStartOnRectangleIcon class="w-5 h-5" />
  </button>
</template>
