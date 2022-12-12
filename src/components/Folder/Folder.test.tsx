import { render, fireEvent } from "@testing-library/react";
import { Folder } from ".";
import { getInitialState } from "../../utils";
import { Finder } from "../../containers/Finder";
import { ContextProps, FinderContext } from "../../contexts/FinderContext";

const mockContextProps: ContextProps = {
  addFile: jest.fn(),
  editFile: jest.fn(),
  moveFile: jest.fn(),
  deleteFile: jest.fn(),
  addFolder: jest.fn(),
  editFolder: jest.fn(),
  loadLocalStorage: jest.fn(),
  updateLocalStorage: jest.fn(),
  resetFinder: jest.fn(),
  folderList: getInitialState(),
};

it("should add a new folder", () => {
  const container = render(
    <FinderContext.Provider value={mockContextProps}>
      <Finder />
    </FinderContext.Provider>
  );
  const { getAllByText } = container;
  fireEvent.click(getAllByText("Add Folder")[0]);
  fireEvent.click(getAllByText("Save")[0]);
  expect(mockContextProps.addFolder).toHaveBeenCalledTimes(1);
});

it("should add a new file to the finder", () => {
  const { getAllByText } = render(
    <FinderContext.Provider value={mockContextProps}>
      <Folder {...mockContextProps.folderList[0]} />
    </FinderContext.Provider>
  );

  fireEvent.click(getAllByText("Add File")[0]);
  expect(mockContextProps.addFile).toHaveBeenCalledTimes(1);
});
