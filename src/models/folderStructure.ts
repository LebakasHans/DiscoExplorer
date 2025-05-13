import type { ExplorerEntry } from './explorerEntry';
import type { SimpleFolderDto } from './simpleFolderDto';

export interface FolderStructureDto {
  name: string;
  folderId: string;
  parentFolderId: string;
  path: SimpleFolderDto[];

  entries: ExplorerEntry[];
}
