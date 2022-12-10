import React, { createContext, useReducer } from "react";
import { FileProps } from "../../components/File";
import { FolderProps } from "../../components/Folder";
import { useFinderReducer } from "../../hooks/useFinderReducer";
import { ReducerActionType } from "../../hooks/useFinderReducer/actions";
import { getInitialState } from "../../utils";

export type ContextProps = {
  folderList: FolderProps[];
  addFolder: (name: string) => void;
  editFolder: (folder: FolderProps) => void;
  addFile: (folderId: number) => void;
  deleteFile: (folderId: number, fileId: string) => void;
  editFile: (file: FileProps, folderId: number) => void;
  moveFile: (fileId: string, fromFolderId: number, toFolderId: number) => void;
  loadLocalStorage: () => void;
  updateLocalStorage: (folderList: FolderProps[]) => void;
  resetFinder: () => void;
};

export const FinderContext = createContext<ContextProps | undefined>(undefined);

export const FinderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(useFinderReducer, getInitialState());

  const value = {
    folderList: state,
    addFolder: (name: string) => {
      dispatch({
        type: ReducerActionType.CREATE_FOLDER,
        payload: name,
      });
      dispatch({ type: ReducerActionType.UPDATE_LOCALSTORAGE, payload: state });
    },
    editFolder: (folder: FolderProps) => {
      dispatch({
        type: ReducerActionType.EDIT_FOLDER,
        payload: folder,
      });
      dispatch({ type: ReducerActionType.UPDATE_LOCALSTORAGE, payload: state });
    },
    addFile: (folderId: number) => {
      dispatch({
        type: ReducerActionType.CREATE_CARD,
        payload: { id: folderId, name: "New!", files: [] },
      });
      dispatch({ type: ReducerActionType.UPDATE_LOCALSTORAGE, payload: state });
    },
    deleteFile: (folderId: number, fileId: string) => {
      dispatch({
        type: ReducerActionType.DELETE_CARD,
        payload: { folderId, fileId },
      });
      dispatch({ type: ReducerActionType.UPDATE_LOCALSTORAGE, payload: state });
    },
    editFile: (file: FileProps, folderId: number) => {
      dispatch({
        type: ReducerActionType.EDIT_CARD,
        payload: { file, folderId },
      });
      dispatch({ type: ReducerActionType.UPDATE_LOCALSTORAGE, payload: state });
    },
    moveFile: (id: string, fromFolderId: number, toFolderId: number) => {
      dispatch({
        type: ReducerActionType.MOVE_CARD,
        payload: { id, fromFolderId, toFolderId },
      });
      dispatch({ type: ReducerActionType.UPDATE_LOCALSTORAGE, payload: state });
    },
    loadLocalStorage: () => {
      dispatch({
        type: ReducerActionType.LOAD_LOCALSTORAGE,
      });
    },
    updateLocalStorage: (folderList: FolderProps[]) => {
      dispatch({
        type: ReducerActionType.UPDATE_LOCALSTORAGE,
        payload: folderList,
      });
    },
    resetFinder: () => {
      dispatch({
        type: ReducerActionType.RESET_FINDER,
      });
      dispatch({
        type: ReducerActionType.LOAD_LOCALSTORAGE,
      });
    },
  };

  return (
    <FinderContext.Provider value={value}>{children}</FinderContext.Provider>
  );
};
