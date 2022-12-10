import { DragEvent, SetStateAction, useContext, useState } from "react";
import { FinderContext, ContextProps } from "../../contexts/FinderContext";
import "./File.css";

export type FileProps = {
  id: string;
  content?: string;
  currentFolderId: number;
};

export const File = (fileProps: FileProps) => {
  const initialStore = useContext(FinderContext);
  const { deleteFile, editFile } = (initialStore as ContextProps) || {};
  const [isEditable, setIsEditable] = useState(false);

  const { id, content, currentFolderId } = fileProps;
  const [currentContent, setCurrentContent] = useState(content);

  const handleDeleteFile = () => {
    deleteFile(currentFolderId, id);
  };

  const handleEditFile = () => {
    setIsEditable(true);
  };

  const handleOnCancel = () => {
    setIsEditable((prev) => !prev);
    setCurrentContent(content);
    setIsEditable(false);
  };

  const handleOnDragStart = (event: DragEvent<HTMLElement>, id: string) => {
    event.dataTransfer.setData("id", id);
    event.dataTransfer.setData("folder", String(currentFolderId));
  };

  const handleOnChangeContent = (event: {
    target: { value: SetStateAction<string | undefined> };
  }) => {
    setCurrentContent(event.target.value);
  };

  const handleOnSaveContent = (event: any) => {
    setCurrentContent(event.target.value);
    const updatedFile = { ...fileProps, content: currentContent };
    editFile(updatedFile, currentFolderId);
    setIsEditable(false);
  };

  const editFileMode = (
    <>
      <textarea value={currentContent} onChange={handleOnChangeContent} />
      <div className="File-Actions-Edit">
        <button onClick={handleOnSaveContent} title="Save File">
          <span role="img" aria-labelledby="Save File">
            💾
          </span>
        </button>
        <button onClick={handleOnCancel} title="Cancel">
          <span role="img" aria-labelledby="Cancel">
            ↶
          </span>
        </button>
      </div>
    </>
  );

  const viewFileMode = (
    <>
      <div className="File-Content">{content}</div>
      <div className="File-Actions">
        <button onClick={handleEditFile} title="Edit File">
          <span role="img" aria-labelledby="Edit File">
            ✏️
          </span>
        </button>
        <button onClick={handleDeleteFile} title="Delete File">
          <span role="img" aria-labelledby="Delete File">
            🗑️
          </span>
        </button>
      </div>
    </>
  );

  return (
    <article
      className="File"
      id={`file-${id}`}
      draggable
      onDragStart={(e) => handleOnDragStart(e, id)}
      title="Drag me!"
    >
      {isEditable ? editFileMode : viewFileMode}
    </article>
  );
};
