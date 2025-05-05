export interface ExplorerEntry {
  name: string;
  id: string;
  path: string;
  size: number;
  corrupted: boolean;
  type: string;
  isFile: boolean;

  createdAt: string;
  modifiedAt: string;
}
