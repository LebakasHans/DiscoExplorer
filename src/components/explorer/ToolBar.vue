<script setup lang="ts">
import { FolderPlusIcon } from '@heroicons/vue/24/outline';

const showAddFolderDialog = ref(false);
const { updateFolderStructure } = useFolderStructure();

function handleFolderCreated() {
  showAddFolderDialog.value = false;
  updateFolderStructure();
}
</script>

<template>
  <Teleport to="body">
    <AddFolderDialog v-model:is-shown="showAddFolderDialog" />
  </Teleport>

  <div class="flex">
    <FolderPlusIcon
      class="size-6 flex-shrink-0 hover:text-blue-500 cursor-pointer"
      @click="showAddFolderDialog = true"
      @folder-created="handleFolderCreated()"
    />
  </div>
</template>
