<script setup lang="ts">
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid';
</script>

<template>
  <div class="flex flex-col h-full items-center justify-center text-red-500 p-4">
    <ExclamationTriangleIcon class="h-1/3 w-1/3 mb-2" />
    <p class="text-xs sm:text-sm md:text-base lg:text-lg text-red-500">
      Something went wrong.
    </p>
  </div>
</template>
