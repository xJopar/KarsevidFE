import { IDragAndDrop } from "./dragAndDrop";

export interface IBoard {
	id: string;
	title: string;
	lists: string[];
}

export interface BoardState {
	// eslint-disable-next-line @typescript-eslint/ban-types
	boards: {
		[boardID: string]: IBoard;
	};
}

export enum BoardActionTypes {
	ADD_BOARD = "ADD_BOARD",
	REMOVE_BOARD = "REMOVE_BOARD",
	EDIT_BOARD_TITLE = "EDIT_BOARD_TITLE",
	SET_BOARDS = "SET_BOARDS",
	ADD_LIST = "ADD_LIST",
	REMOVE_LIST = "REMOVE_LIST",
	DRAG_DROP = "DRAG_DROP",
}

interface AddBoardAction {
	type: BoardActionTypes.ADD_BOARD;
	payload: { boardID: string; title: string };
}

interface RemoveBoardAction {
	type: BoardActionTypes.REMOVE_BOARD;
	payload: { boardID: string };
}

interface EditBoardTitleAction {
	type: BoardActionTypes.EDIT_BOARD_TITLE;
	payload: { boardID: string; title: string };
}

interface SetBoardsAction {
	type: BoardActionTypes.SET_BOARDS;
	payload: { [boardID: string]: IBoard };
}

interface AddListAction {
	type: BoardActionTypes.ADD_LIST;
	payload: { boardID: string; listID: string };
}

interface RemoveListAction {
	type: BoardActionTypes.REMOVE_LIST;
	payload: { boardID: string; listID: string };
}

interface DragAndDropAction {
	type: BoardActionTypes.DRAG_DROP;
	payload: IDragAndDrop;
}

export type BoardAction =
	| AddBoardAction
	| RemoveBoardAction
	| EditBoardTitleAction
	| SetBoardsAction
	| AddListAction
	| RemoveListAction
	| DragAndDropAction;
