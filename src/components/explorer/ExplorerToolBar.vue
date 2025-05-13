<script setup lang="ts">
import { ArrowPathIcon, FolderPlusIcon } from '@heroicons/vue/24/outline';

const showAddFolderDialog = ref(false);
const { updateFolderStructure } = useFolderStructure();
const { showToast } = useToastService();

function handleFolderCreated() {
  showAddFolderDialog.value = false;
  updateFolderStructure();
  showToast({
    message: 'Folder created successfully',
    severity: 'success',
  });
}
</script>

<template>
  <Teleport to="body">
    <AddFolderDialog
      v-model:is-shown="showAddFolderDialog"
      @folder-created="handleFolderCreated()"
    />
  </Teleport>

  <div class="flex">
    <FolderPlusIcon
      class="size-6 flex-shrink-0 hover:text-blue-500 cursor-pointer"
      @click="showAddFolderDialog = true"
    />
    <div class="ml-auto">
      <ArrowPathIcon
        class="size-6 flex-shrink-0 hover:text-blue-500 cursor-pointer"
        @click="updateFolderStructure()"
      />
    </div>
  </div>
</template>
