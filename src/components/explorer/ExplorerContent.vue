<script setup lang="ts">
import type { FolderStructureDto } from '~/models/folderStructure';

defineProps<{
  folderStructure: FolderStructureDto;
}>();
</script>

<template>
  <div class="flex w-full h-full">
    <div class="w-1/5">
      tmp
    </div>
    <EntryTable
      class="w-4/5"
      :folder-structure="folderStructure"
    />
  </div>
</template>
