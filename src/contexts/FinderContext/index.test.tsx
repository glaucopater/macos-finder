// @ts-nocheck
import { render, renderHook } from "@testing-library/react";
import { useContext, useEffect, useReducer } from "react";
import { act } from "react-dom/test-utils";
import { ContextProps, FinderContext } from ".";
import { useFinderReducer } from "../../hooks/useFinderReducer";
import { ReducerActionType } from "../../hooks/useFinderReducer/actions";
import { initialState } from "../../store";
import { sampleState } from "../../store/fixtures";
import { getInitialState } from "../../utils";

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

function TestComponent(mockContextProps: ContextProps) {
  const initialStore = useContext(FinderContext);
  const { folderList, addFile, deleteFile, editFile, moveFile } =
    (initialStore as ContextProps) || {};

  useEffect(() => {
    addFile(1);
  }, [mockContextProps, addFile]);

  useEffect(() => {
    deleteFile(1, "1");
  }, [mockContextProps, addFile]);

  useEffect(() => {
    editFile(sampleState[0].files[0]!, 1);
  }, [mockContextProps, addFile]);

  useEffect(() => {
    moveFile(sampleState[0].files[0].id, 1, 2);
  }, [mockContextProps, moveFile]);

  return <div id="result">{JSON.stringify(folderList)}</div>;
}

describe("test file actions", () => {
  it("test file actions", () => {
    render(
      <FinderContext.Provider value={mockContextProps}>
        <TestComponent {...mockContextProps} />)
      </FinderContext.Provider>
    );

    const { result } = renderHook(() =>
      useReducer(useFinderReducer, initialState)
    );

    const [, dispatch] = result.current;

    act(() => {
      dispatch({
        type: ReducerActionType.CREATE_FILE,
        payload: sampleState[0],
      });
      dispatch({
        type: ReducerActionType.DELETE_FILE,
        payload: { folderId: sampleState[0].id, fileId: "1" },
      });
      dispatch({
        type: ReducerActionType.EDIT_FILE,
        payload: {
          folderId: sampleState[0].id,
          file: sampleState[0].files?.at(0)!
        },
      });
      dispatch({
        type: ReducerActionType.MOVE_FILE,
        payload: {
          id: "1.1",
          fromFolderId: 1,
          toFolderId: 2,
        },
      });
    });

    expect(mockContextProps.addFile).toHaveBeenCalledWith(1);
    expect(mockContextProps.deleteFile).toHaveBeenCalledWith(1, "1");
    expect(mockContextProps.editFile).toHaveBeenCalledWith(
      {
        content: "lorem ipsum 1.1",
        currentFolderId: 1,
        id: "1.1",
      },
      1
    );
    expect(mockContextProps.moveFile).toHaveBeenCalledWith("1.1", 1, 2);
  });
});
