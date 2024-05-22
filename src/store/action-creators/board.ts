import { BoardAction, BoardActionTypes, IBoard } from "../../types/board";

export const addBoard = ({
	id: boardID,
	title,
}: {
	id: string;
	title: string;
}): BoardAction => {
	return { type: BoardActionTypes.ADD_BOARD, payload: { boardID, title } };
};

export const removeBoard = ({ boardID }: { boardID: string }): BoardAction => {
	return { type: BoardActionTypes.REMOVE_BOARD, payload: { boardID } };
};

export const editBoardTitle = ({
	id: boardID,
	title,
}: {
	id: string;
	title: string;
}): BoardAction => {
	return {
		type: BoardActionTypes.EDIT_BOARD_TITLE,
		payload: { boardID, title },
	};
};

export const setBoards = (boards: {
	[boardID: string]: IBoard;
}): BoardAction => {
	return { type: BoardActionTypes.SET_BOARDS, payload: boards };
};

export const addList = ({
	boardID,
	listID,
}: {
	boardID: string;
	listID: string;
}): BoardAction => {
	return { type: BoardActionTypes.ADD_LIST, payload: { boardID, listID } };
};

export const removeList = ({
	boardID,
	listID,
}: {
	boardID: string;
	listID: string;
}): BoardAction => {
	return { type: BoardActionTypes.REMOVE_LIST, payload: { boardID, listID } };
};
