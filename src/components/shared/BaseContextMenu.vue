<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { ExplorerEntry } from '~/models/explorerEntry';

const props = defineProps<{
  event: MouseEvent;
  entry: ExplorerEntry;
}>();

const menuPositionStyle = computed((): CSSProperties => ({
  position: 'absolute',
  top: `${props.event.clientY}px`,
  left: `${props.event.clientX}px`,
  zIndex: 1000,
}));
</script>

<template>
  <Teleport to="body">
    <div
      :style="menuPositionStyle"
      class="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg p-2 min-w-[150px]"
      @click.stop
    >
      <slot />
    </div>
  </Teleport>
</template>
