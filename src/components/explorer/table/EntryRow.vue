<script setup lang="ts">
import type { ExplorerEntry } from '~/models/explorerEntry';
import { DocumentIcon, FolderIcon } from '@heroicons/vue/24/outline';

defineProps<{
  entry: ExplorerEntry;
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
</script>

<template>
  <tr>
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
