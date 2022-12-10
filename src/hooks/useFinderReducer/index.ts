import { Reducer } from "react";
import { FolderProps } from "../../components/Folder";
import { initialState } from "../../store";
import { generateRandomId, sortArrayById } from "../../utils";
import { ReducerAction, ReducerActionType } from "./actions";

export const useFinderReducer: Reducer<FolderProps[], ReducerAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case ReducerActionType.CREATE_FOLDER:
      const name = action.payload;
      const nextFolderId = state.length + 1;
      const emptyFolder: FolderProps = {
        id: nextFolderId,
        name: name,
        files: [],
      };
      return [...state, emptyFolder];
    case ReducerActionType.EDIT_FOLDER:
      const folderToBeUpdated = action.payload;
      return sortArrayById([
        ...state.filter((folder) => folder.id !== folderToBeUpdated.id),
        folderToBeUpdated,
      ]);
    case ReducerActionType.CREATE_FILE:
      const selectedFolderId = action.payload;
      const newId = generateRandomId();
      const createdFile = { id: newId, content: "📄" + newId };
      const selectedFolder = state.filter(
        (folder) => folder.id === selectedFolderId.id
      )[0];
      const updatedFolder = {
        ...selectedFolder,
        files: [...selectedFolder.files || [], createdFile],
      };
      const theOtherFolders = state.filter(
        (folder) => folder.id !== selectedFolder.id
      );
      return sortArrayById([...theOtherFolders, updatedFolder]);
    case ReducerActionType.DELETE_FILE:
      // delete file by folder id and file id
      const { folderId, fileId } = action.payload;
      const currentFolder = state.find((folder) => folder.id === folderId);
      const folderToBeUdpated = currentFolder;
      if (folderToBeUdpated) {
        folderToBeUdpated.files = currentFolder.files?.filter(
          (file) => file.id !== fileId
        );
      }
      return sortArrayById([
        ...state.filter((folder) => folder.id !== folderId),
        folderToBeUdpated,
      ]);

    case ReducerActionType.EDIT_FILE: {
      // edit file by content and folder and id
      const { file: editedFile, folderId } = action.payload;
      const folderToBeUpdated = state.find((folder) => folder.id === folderId);
      if (folderToBeUpdated) {
        folderToBeUpdated.files = folderToBeUpdated.files?.map((file) => {
          if (file.id === editedFile.id) return editedFile;
          return file;
        });
      }
      const theOtherFolders = state.filter((folder) => folder.id !== folderId);
      return sortArrayById([...theOtherFolders, folderToBeUpdated]);
    }
    case ReducerActionType.MOVE_FILE: {
      const { id, fromFolderId, toFolderId } = action.payload;
      // find this folder in store
      const fromFolder = state.find((folder) => folder.id === fromFolderId);
      const fromFolderOriginalFile =
        fromFolder?.files?.find((file) => file.id === id) || null;
      if (fromFolder) {
        fromFolder.files = fromFolder.files?.filter((file) => file.id !== id);
      }
      const toFolder = state.find((folder) => folder.id === toFolderId);
      if (toFolder && fromFolderOriginalFile) {
        toFolder.files = [...toFolder.files || [], fromFolderOriginalFile];
      }
      return sortArrayById([
        ...state.filter(
          (folder) => folder.id !== fromFolderId && folder.id !== toFolderId
        ),
        fromFolder,
        toFolder,
      ]);
    }
    case ReducerActionType.LOAD_LOCALSTORAGE:
      const store = localStorage.getItem("state");
      return store ? JSON.parse(store) : state;
    case ReducerActionType.UPDATE_LOCALSTORAGE:
      localStorage.setItem("state", JSON.stringify(state));
      return state;
    case ReducerActionType.RESET_FINDER:
      localStorage.setItem("state", JSON.stringify(initialState));
      return state;
    default:
      return state;
  }
};
