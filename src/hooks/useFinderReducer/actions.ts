import { FileProps } from "../../components/File";
import { FolderProps } from "../../components/Folder";

export enum ReducerActionType {
  CREATE_FOLDER,
  EDIT_FOLDER,
  CREATE_FILE,
  DELETE_FILE,
  EDIT_FILE,
  MOVE_FILE,
  LOAD_LOCALSTORAGE,
  UPDATE_LOCALSTORAGE,
  RESET_FINDER,
}

export type CreateFolderAction = {
  type: ReducerActionType.CREATE_FOLDER;
  payload: FolderProps["name"];
};

export type EditFolderAction = {
  type: ReducerActionType.EDIT_FOLDER;
  payload: FolderProps;
};

export type CreateFileAction = {
  type: ReducerActionType.CREATE_FILE;
  payload: { destinationFolder: FolderProps; fileId?: string };
};

export type MoveFileAction = {
  type: ReducerActionType.MOVE_FILE;
  payload: { id: string; fromFolderId: number; toFolderId: number };
};

export type EditFileAction = {
  type: ReducerActionType.EDIT_FILE;
  payload: { file: FileProps; folderId: number };
};

export type DeleteFileAction = {
  type: ReducerActionType.DELETE_FILE;
  payload: { folderId: number; fileId: string };
};

export type LoadLocalStorage = {
  type: ReducerActionType.LOAD_LOCALSTORAGE;
};

export type UpdateLocalStorage = {
  type: ReducerActionType.UPDATE_LOCALSTORAGE;
  payload: FolderProps[];
};

export type ResetFinder = {
  type: ReducerActionType.RESET_FINDER;
};

export type ReducerAction =
  | CreateFolderAction
  | EditFolderAction
  | CreateFileAction
  | DeleteFileAction
  | EditFileAction
  | MoveFileAction
  | LoadLocalStorage
  | UpdateLocalStorage
  | ResetFinder;
