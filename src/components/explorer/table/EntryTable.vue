<script setup lang="ts">
import type { ExplorerEntry } from '~/models/explorerEntry';
import type { FolderStructureDto } from '~/models/folderStructure';

defineProps<{
  folderStructure: FolderStructureDto;
}>();

const emit = defineEmits<{
  (e: 'dblclick', entry: ExplorerEntry): void;
}>();
</script>

<template>
  <div>
    <table class="min-w-full table-fixed">
      <thead>
        <tr>
          <th class="w-1/3 px-2 py-1 text-left">
            Name
          </th>
          <th class="w-[100px] px-2 py-1 text-left">
            Type
          </th>
          <th class="w-[100px] px-2 py-1 text-right">
            Size
          </th>
          <th class="w-[120px] px-2 py-1 text-right">
            Created
          </th>
          <th class="w-[120px] px-2 py-1 text-right">
            Modified
          </th>
        </tr>
      </thead>
      <tbody>
        <EntryRow
          v-for="entry in folderStructure.entries"
          :key="entry.id"
          :entry="entry"
          @dblclick="emit('dblclick', entry)"
        />
      </tbody>
    </table>
  </div>
</template>
