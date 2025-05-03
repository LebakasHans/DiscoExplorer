import type { ExplorerEntry } from './explorerEntry';

export interface FolderStructureDto {
  name: string;
  folderId: string;

  entries: ExplorerEntry[];
}
