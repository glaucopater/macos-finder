import { SetStateAction, useContext, useState } from "react";
import { FinderContext, ContextProps } from "../../contexts/FinderContext";
import { ButtonBasic } from "../ButtonBasic";
import "./AddFolderButton.css";

const defaultContent = "Add Title";

export const AddFolderButton = () => {
  const initialStore = useContext(FinderContext);
  const { addFolder } = (initialStore as ContextProps) || {};
  const [isEditable, setIsEditable] = useState(false);
  const [currentContent, setCurrentContent] = useState(defaultContent);

  const handleOnAddFolder = () => {
    setIsEditable(true);
  };

  const handleOnChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCurrentContent(event.target.value);
  };

  const handleOnSave = () => {
    setIsEditable(false);
    addFolder(currentContent);
  };

  const handleOnCancel = () => {
    setIsEditable(false);
    setCurrentContent(defaultContent);
    setIsEditable(false);
  };

  return (
    <section className="Folder">
      {isEditable ? (
        <>
          <input
            className="AddFolderButton-Input"
            type="text"
            value={currentContent}
            onChange={handleOnChange}
          />
          <div className="AddFolderButton-Actions">
            <ButtonBasic onClickHandler={handleOnSave}>Save </ButtonBasic>
            <ButtonBasic onClickHandler={handleOnCancel}>Cancel </ButtonBasic>
          </div>
        </>
      ) : (
        <button className="AddFolderButton" onClick={handleOnAddFolder}>
          Add Folder
        </button>
      )}
    </section>
  );
};
