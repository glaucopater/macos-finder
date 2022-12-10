import { render, fireEvent } from "@testing-library/react";
import { FinderContext, ContextProps } from "../../contexts/FinderContext";
import { File } from ".";
import { getInitialState } from "../../utils";
import { sampleState } from "../../store/fixtures";

const addFile = jest.fn();
const editFile = jest.fn();
const moveFile = jest.fn();
const deleteFile = jest.fn();
const addFolder = jest.fn();
const editFolder = jest.fn();
const loadLocalStorage = jest.fn();
const updateLocalStorage = jest.fn();
const resetFinder = jest.fn();

const mockContextProps: ContextProps = {
  addFile,
  editFile,
  moveFile,
  deleteFile,
  addFolder,
  editFolder,
  loadLocalStorage,
  updateLocalStorage,
  resetFinder,
  folderList: getInitialState(),
};

describe("file", () => {
  it("should test edit and cancel buttons", () => {
    const mockFileProps = sampleState[0].files[0];

    const { getAllByRole } = render(
      <FinderContext.Provider value={mockContextProps}>
        <File {...mockFileProps} />
      </FinderContext.Provider>
    );

    const buttons = getAllByRole("button");
    const editButton = buttons[0];
    fireEvent.click(editButton);
    // note that now the buttons are different but we don't have to redacler buttons
    const saveButton = buttons[0];
    fireEvent.click(saveButton);
    expect(editFile).toHaveBeenCalledTimes(1);
  });

  it("should test edit and save buttons", () => {
    const mockFileProps = sampleState[0].files[0];

    const { getAllByRole } = render(
      <FinderContext.Provider value={mockContextProps}>
        <File {...mockFileProps} />
      </FinderContext.Provider>
    );

    const buttons = getAllByRole("button");
    const editButton = buttons[0];
    fireEvent.click(editButton);
    // note that now the buttons are different but we don't have to redacler buttons
    const cancelButton = buttons[1];
    fireEvent.click(cancelButton);
    expect(editFile).toHaveBeenCalledTimes(0);
  });
});
