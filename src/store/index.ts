import { FolderProps } from "../components/Folder";

export const initialState: FolderProps[] = [
  {
    id: 1,
    name: "BauPal",
    files: [],
    folders: [
      {
        id: 11,
        name: "BauPal11",
        files: [
          {
            id: "file1",
            content: "none",
            currentFolderId: 11,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "BauPal2",
    files: [],
  },
  {
    id: 3,
    name: "BauPal3",
    files: [],
  },
];
