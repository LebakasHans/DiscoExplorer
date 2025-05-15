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
  <div class="overflow-x-auto">
    <table class="w-full table-fixed">
      <thead>
        <tr>
          <th class="w-1/2 md:w-1/3 min-w-[120px] px-2 py-1 text-left">
            Name
          </th>
          <th class="w-16 md:w-[100px] min-w-[60px] px-2 py-1 text-left hidden sm:table-cell">
            Type
          </th>
          <th class="w-16 md:w-[100px] min-w-[50px] px-2 py-1 text-right hidden sm:table-cell">
            Size
          </th>
          <th class="w-20 md:w-[120px] min-w-[70px] px-2 py-1 text-right hidden md:table-cell">
            Created
          </th>
          <th class="w-20 md:w-[120px] min-w-[70px] px-2 py-1 text-right hidden md:table-cell">
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
