import { SyntheticEvent } from "react";
import "./AddFileButton.css";

export type AddFileButtonProps = {
  folderId: number;
  content?: string;
  onClickHandler: (id: number) => void;
};

export const AddFileButton = (fileProps: AddFileButtonProps) => {
  const handleOnClick = (id: number) => (_e: SyntheticEvent) => {
    fileProps.onClickHandler(id);
  };

  return (
    <button
      className="AddButton"
      onClick={(e) => handleOnClick(fileProps.folderId)(e)}
    >
      Add File
    </button>
  );
};
