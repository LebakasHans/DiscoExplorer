<script setup lang="ts">
const emit = defineEmits<{
  (e: 'filesDropped', files: File[]): void;
}>();

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
}

function handleDrop(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();

  if (event.dataTransfer?.files) {
    const filesArray = Array.from(event.dataTransfer.files);
    emit('filesDropped', filesArray);
  }
}

onMounted(() => {
  window.addEventListener('dragover', handleDragOver);
  window.addEventListener('drop', handleDrop);
});

onBeforeUnmount(() => {
  window.removeEventListener('dragover', handleDragOver);
  window.removeEventListener('drop', handleDrop);
});
</script>

<template>
  <div />
</template>
