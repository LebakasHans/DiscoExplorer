<script setup lang="ts">
import type { ExplorerEntry } from '~/models/explorerEntry';
import type { FolderStructureDto } from '~/models/folderStructure';
import { onMounted, onUnmounted, ref } from 'vue';
import EntryRowContextMenu from './EntryRowContextMenu.vue';

defineProps<{
  folderStructure: FolderStructureDto;
}>();

const emit = defineEmits<{
  (e: 'dblclick', entry: ExplorerEntry): void;
  (e: 'delete', entry: ExplorerEntry): void;
  (e: 'attach', entry: ExplorerEntry): void;
}>();

const showContextMenu = ref(false);
const contextMenuEvent = ref<MouseEvent | null>(null);
const contextMenuEntry = ref<ExplorerEntry | null>(null);

function onRowContextMenu(event: MouseEvent, entry: ExplorerEntry) {
  event.preventDefault();
  contextMenuEvent.value = event;
  contextMenuEntry.value = entry;
  showContextMenu.value = true;
}

function closeContextMenu() {
  showContextMenu.value = false;
  contextMenuEvent.value = null;
  contextMenuEntry.value = null;
}

onMounted(() => {
  window.addEventListener('click', closeContextMenu);
});

onUnmounted(() => {
  window.removeEventListener('click', closeContextMenu);
});
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
          @contextmenu.prevent="onRowContextMenu($event, entry)"
        />
      </tbody>
    </table>

    <EntryRowContextMenu
      v-if="showContextMenu && contextMenuEvent && contextMenuEntry"
      :event="contextMenuEvent"
      :entry="contextMenuEntry"
      @delete="emit('delete', contextMenuEntry)"
      @attach="emit('attach', contextMenuEntry)"
    />
  </div>
</template>
