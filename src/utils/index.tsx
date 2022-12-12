import { FileProps } from "../components/File";
import { FolderProps } from "../components/Folder";
import { initialState } from "../store";

export const generateRandomInt = () => {
  const array = new Uint32Array(1);
  self.crypto.getRandomValues(array);
  return array[0];
};

export const generateRandomId = (): string => {
  return String(generateRandomInt());
};

export const sortArrayById = (arr: any[]) => {
  const tempArray = [...arr];

  tempArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

  return tempArray; // sortArrayByProperty(arr, "id");
};

export const sortArrayByProperty = (arr: any[], property: string) => {
  arr.sort((a, b) => a[property].charCodeAt(0) - b[property].charCodeAt(0));
  return arr;
};

export const getInitialState = () => {
  const store = localStorage.getItem("state");
  if (store) {
    return JSON.parse(store);
  }
  return initialState;
};

export function searchFoldersExceptId(
  root: FolderProps,
  id: number
): FolderProps[] {
  const folders: FolderProps[] = [];
  if (root.id !== id) {
    folders.push(root);
  }
  if (root.folders) {
    for (const folder of root.folders) {
      folders.push(...searchFoldersExceptId(folder, id));
    }
  }
  return folders;
}

export function searchFoldersById(
  root: FolderProps,
  id: number
): FolderProps | null {
  if (root.id === id) {
    return root;
  }
  if (root.folders) {
    for (const folder of root.folders) {
      const result = searchFoldersById(folder, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export function searchFoldersByIdAndAppendFile(
  root: FolderProps,
  id: number,
  file: FileProps
): FolderProps {
  const rootClone = { ...root };
  if (rootClone.id === id) {
    return {
      ...rootClone,
      files: [...(rootClone.files ? rootClone.files : []), file],
    };
  } else if (rootClone.folders) {
    return {
      ...rootClone,
      folders: rootClone.folders.map((folder) =>
        searchFoldersByIdAndAppendFile(folder, id, file)
      ),
    };
  }
  return root;
}

export function removeFileByFolderIdAndFileId(
  rootFolder: FolderProps,
  folderId: FolderProps["id"],
  fileId: FileProps["id"]
): FolderProps {
  const rootClone = { ...rootFolder };
  if (rootClone.id === folderId) {
    return {
      ...rootClone,
      files: [
        ...(rootClone.files
          ? rootClone.files.filter((file) => file.id !== fileId)
          : []),
      ],
    };
  } else if (rootClone.folders) {
    return {
      ...rootClone,
      folders: rootClone.folders.map((folder) =>
        removeFileByFolderIdAndFileId(folder, folderId, fileId)
      ),
    };
  }
  return rootClone;
}

export function removeFileById(
  root: FolderProps,
  id: number,
  file: FileProps
): FolderProps {
  const rootClone = { ...root };
  if (rootClone.id === id) {
    return {
      ...rootClone,
      files: [...(rootClone.files ? rootClone.files : []), file],
    };
  } else if (rootClone.folders) {
    return {
      ...rootClone,
      folders: rootClone.folders.map((folder) =>
        removeFileById(folder, id, file)
      ),
    };
  }
  return root;
}
