<script setup lang="ts">
import type { ExplorerEntry } from '~/models/explorerEntry';
import { DocumentIcon, FolderIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  entry: ExplorerEntry;
}>();

const emit = defineEmits<{
  (e: 'dblclick', entry: ExplorerEntry): void;
  (e: 'contextmenu', event: MouseEvent, entry: ExplorerEntry): void;
}>();

function formatSize(size: number): string {
  if (size === undefined || size === null)
    return '';

  if (size < 1024)
    return `${size} B`;
  if (size < 1024 * 1024)
    return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function onDoubleClick() {
  emit('dblclick', props.entry);
}
</script>

<template>
  <tr
    class="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
    @dblclick="onDoubleClick"
    @contextmenu="emit('contextmenu', $event, entry)"
  >
    <td class="flex items-center space-x-2 max-w-xs">
      <DocumentIcon
        v-if="entry.isFile"
        class="size-6 flex-shrink-0"
      />
      <FolderIcon
        v-else
        class="size-6 flex-shrink-0"
      />
      <span class="truncate" :title="entry.name">{{ entry.name }}</span>
    </td>
    <td class="max-w-[100px]">
      <span class="truncate block" :title="entry.type">{{ entry.type }}</span>
    </td>
    <td class="text-right">
      {{ formatSize(entry.size) }}
    </td>
    <td class="text-right">
      {{ new Date(entry.createdAt).toLocaleDateString() }}
    </td>
    <td class="text-right">
      {{ new Date(entry.modifiedAt).toLocaleDateString() }}
    </td>
  </tr>
</template>
