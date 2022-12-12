import { File, FileProps } from "../File";
import { SetStateAction, useContext, useState } from "react";
import { FinderContext, ContextProps } from "../../contexts/FinderContext";
import { AddFileButton } from "../AddFileButton";
import "./Folder.css";

export type FolderProps = {
  id: number;
  name: string;
  files?: FileProps[];
  folders?: FolderProps[];
};

// each list could have different height, but the width should be dynamic
export const Folder = (folderProps: FolderProps) => {
  const initialStore = useContext(FinderContext);
  const { editFolder, addFile, moveFile } =
    (initialStore as ContextProps) || {};
  const { id, name, files, folders } = folderProps;
  const [isEditable, setIsEditable] = useState(false);
  const [currentName, setCurrentName] = useState(name);

  const handleAddFile = () => {
    addFile(id);
  };

  const handleOnDragOver = (event: DragEvent | React.SyntheticEvent) => {
    event.preventDefault();
    const dragEvent = event as React.DragEvent;
    if (dragEvent?.dataTransfer) dragEvent.dataTransfer.getData("id");
  };

  const handleOnDrop = (event: DragEvent | React.SyntheticEvent) => {
    const dragEvent = event as React.DragEvent;
    const fileId = dragEvent.dataTransfer.getData("id");
    const fromFolderId = Number(dragEvent.dataTransfer.getData("folder"));
    if (fromFolderId !== id) moveFile(fileId, fromFolderId, id);
  };

  const handleEditName = () => {
    setIsEditable(true);
  };

  const handlehandleOnChangeName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCurrentName(event.target.value);
  };

  const handleSaveName = () => {
    editFolder({ ...folderProps, name: currentName });
    setIsEditable(false);
  };

  const handleOnKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSaveName();
    }
  };

  return (
    <section
      className="Folder"
      id={`folder-${id}`}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      <div
        className="Folder-Header"
        onClick={handleEditName}
        onBlur={handleSaveName}
        onKeyDown={handleOnKeyDown}
      >
        <span className="Folder-Name">
          {isEditable ? (
            <input
              className="Folder-Input"
              type="text"
              value={currentName}
              onChange={handlehandleOnChangeName}
            />
          ) : (
            currentName
          )}
        </span>
        ➡️
      </div>
      <ul className="File-List">
        {files?.map((item, index) => (
          <li key={index}>
            <File {...item} currentFolderId={id} />
          </li>
        ))}
      </ul>
      <AddFileButton onClickHandler={handleAddFile} folderId={id} />
      <hr/>
      <ul className="File-List">
        {folders?.map((folder, index) => (
          <li key={index}>
            <Folder {...folder} />
          </li>
        ))}
      </ul>
    </section>
  );
};
