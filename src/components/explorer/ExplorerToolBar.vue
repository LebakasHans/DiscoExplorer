<script setup lang="ts">
import { ArrowPathIcon, DocumentArrowUpIcon, FolderPlusIcon } from '@heroicons/vue/24/outline';

const emit = defineEmits<{
  (e: 'fileUpload', files: File[]): void;
}>();

const { updateFolderStructure } = useFolderStructure();
const { showToast } = useToastService();

const showAddFolderDialog = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

function handleFolderCreated() {
  showAddFolderDialog.value = false;
  updateFolderStructure();
  showToast({
    message: 'Folder created successfully',
    severity: 'success',
  });
}

function openFileSelector() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleFileSelection(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const files = Array.from(input.files);
    emit('fileUpload', files);

    input.value = '';
  }
}
</script>

<template>
  <div>
    <Teleport to="body">
      <AddFolderDialog
        v-model:is-shown="showAddFolderDialog"
        @folder-created="handleFolderCreated()"
      />
    </Teleport>

    <div class="flex">
      <div class="flex space-x-4">
        <FolderPlusIcon
          class="size-6 flex-shrink-0 hover:text-blue-500 cursor-pointer"
          @click="showAddFolderDialog = true"
        />
        <DocumentArrowUpIcon
          class="size-6 flex-shrink-0 hover:text-blue-500 cursor-pointer"
          @click="openFileSelector()"
        />
      </div>
      <div class="ml-auto">
        <ArrowPathIcon
          class="size-6 flex-shrink-0 hover:text-blue-500 cursor-pointer"
          @click="updateFolderStructure()"
        />
      </div>
      <input
        ref="fileInput"
        type="file"
        multiple
        class="hidden"
        @change="handleFileSelection"
      >
    </div>
  </div>
</template>
