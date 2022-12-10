import { Key, useContext } from "react";
import { AddFolderButton } from "../../components/AddFolderButton";
import { FinderContext, ContextProps } from "../../contexts/FinderContext";
import { Folder, FolderProps } from "../../components/Folder";
import "./Finder.css";

export const Finder = () => {
  const initialStore = useContext(FinderContext);
  const { folderList: state } = (initialStore as ContextProps) || {};

  return (
    <div className="Finder">
      {state?.map(
        (
          folder: JSX.IntrinsicAttributes & FolderProps,
          index: Key | null | undefined
        ) => (
          <Folder key={index} {...folder} />
        )
      )}
      <AddFolderButton />
    </div>
  );
};
