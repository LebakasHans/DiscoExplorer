<script setup lang="ts">
import type { ExplorerEntry } from '~/models/explorerEntry';
import { TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  event: MouseEvent;
  entry: ExplorerEntry;
}>();

const emit = defineEmits<{
  (e: 'delete', entry: ExplorerEntry): void;
}>();
</script>

<template>
  <BaseContextMenu :event="props.event" :entry="props.entry">
    <div>
      <button
        class="flex items-center space-x-2 text-red-600 hover:text-red-800"
        @click="emit('delete', props.entry)"
      >
        <TrashIcon class="w-5 h-5" />
        <span>Delete</span>
      </button>
    </div>
  </BaseContextMenu>
</template>
