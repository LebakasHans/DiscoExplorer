export interface ExplorerEntry {
  name: string;
  id: string;
  size: number;
  corrupted: boolean;
  type: string;
  isFile: boolean;

  createdAt: string;
  modifiedAt: string;
}
