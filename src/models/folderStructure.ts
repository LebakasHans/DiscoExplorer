import type { ExplorerEntry } from './explorerEntry';

export interface FolderStructureDto {
  name: string;
  folderId: string;
  parentFolderId: string;
  path: string;

  entries: ExplorerEntry[];
}
