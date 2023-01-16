import { Reducer } from "react";
import { FileProps } from "../../components/File";
import { FolderProps } from "../../components/Folder";
import { LOCALSTORAGE_STATE_KEY } from "../../config";
import { initialState } from "../../store";
import {
  generateRandomId,
  removeFileByFolderIdAndFileId,
  searchFoldersById,
  searchFoldersByIdAndAppendFile,
  sortArrayById,
} from "../../utils";
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
      console.log("action", ReducerActionType.CREATE_FILE, state);
      const { destinationFolder: selectedFolderId, fileId: movedFileId } =
        action.payload;
      const newId = movedFileId ?? generateRandomId();
      const createdFile: FileProps = {
        id: newId,
        content: "📄" + newId,
        currentFolderId: selectedFolderId.id,
      };
      const selectedFolders = state.filter((folder) =>
        searchFoldersById(folder, selectedFolderId.id)
      );
      if (selectedFolders.length) {
        return state.map((folder) =>
          searchFoldersByIdAndAppendFile(
            folder,
            selectedFolderId.id,
            createdFile
          )
        );
      }
      return state;
    case ReducerActionType.DELETE_FILE:
      // delete file by folder id and file id
      const { folderId, fileId } = action.payload;
      return state.map((folder) =>
        removeFileByFolderIdAndFileId(folder, folderId, fileId)
      );
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
    case ReducerActionType.LOAD_LOCALSTORAGE:
      const store = localStorage.getItem(LOCALSTORAGE_STATE_KEY);
      return store ? JSON.parse(store) : state;
    case ReducerActionType.UPDATE_LOCALSTORAGE:
      localStorage.setItem(LOCALSTORAGE_STATE_KEY, JSON.stringify(state));
      return state;
    case ReducerActionType.RESET_FINDER:
      localStorage.setItem(LOCALSTORAGE_STATE_KEY, JSON.stringify(initialState));
      return state;
    default:
      return state;
  }
};
