import { FolderProps } from "../components/Folder";

export const sampleState: FolderProps[] = [
  {
    id: 1,
    name: "To Do",
    files: [
      {
        id: "1.1",
        content: "lorem ipsum 1.1",
        currentFolderId: 1,
      },
      {
        id: "1.2",
        content: "lorem ipsum 2.1",
        currentFolderId: 1,
      },
      {
        id: "1.3",
        content: "lorem ipsum 3.1",
        currentFolderId: 1,
      },
    ],
  },
  {
    id: 2,
    name: "In progress",
    files: [
      {
        id: "2.1",
        content: "lorem ipsum 2.1",
        currentFolderId: 2,
      },
    ],
  },
  {
    id: 3,
    name: "Done",
    files: [
      {
        id: "1",
        content: "lorem ipsum 2.2",
        currentFolderId: 3,
      },
    ],
  },
];

export const randomOrderState: FolderProps[] = [
  {
    id: 2,
    name: "B",
    files: [],
  },
  {
    id: 3,
    name: "C",
    files: [],
  },
  {
    id: 1,
    name: "A",
    files: [],
  },
];
