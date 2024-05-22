import { BoardAction, BoardActionTypes, BoardState } from "../../types/board";

const initialState: BoardState = {
	boards: {},
};

export const boardReducer = (
	state = initialState,
	action: BoardAction
): BoardState => {
	switch (action.type) {
		case BoardActionTypes.ADD_BOARD: {
			const { boardID, title } = action.payload;
			const newBoard = {
				id: boardID,
				title,
				lists: [],
			};

			return {
				...state,
				boards: { ...state.boards, [boardID]: newBoard },
			};
		}
		case BoardActionTypes.REMOVE_BOARD: {
			const { boardID } = action.payload;
			const boards = { ...state.boards };

			delete boards[boardID];

			return { ...state, boards };
		}
		case BoardActionTypes.EDIT_BOARD_TITLE: {
			const { boardID, title } = action.payload;
			const board = state.boards[boardID];

			board.title = title;

			return { ...state, boards: { ...state.boards, [boardID]: board } };
		}
		case BoardActionTypes.SET_BOARDS: {
			return { ...state, boards: action.payload };
		}
		case BoardActionTypes.ADD_LIST: {
			const { boardID, listID } = action.payload;
			const board = state.boards[boardID];

			board.lists.push(listID);

			return {
				...state,
				boards: {
					...state.boards,
					[boardID]: board,
				},
			};
		}
		case BoardActionTypes.REMOVE_LIST: {
			const { boardID, listID } = action.payload;
			const board = state.boards[boardID];
			const newLists = board.lists.filter((list) => list !== listID);
			board.lists = newLists;

			return { ...state, boards: { ...state.boards, [boardID]: board } };
		}
		case BoardActionTypes.DRAG_DROP: {
			const { boardID, type, droppableIndexStart, droppableIndexEnd } =
				action.payload;

			if (type !== "list") return state;

			const board = state.boards[boardID];
			const lists = board.lists;
			const [reorderedList] = lists.splice(droppableIndexStart, 1);

			lists.splice(droppableIndexEnd, 0, reorderedList);
			board.lists = lists;

			return { ...state, boards: { ...state.boards, [boardID]: board } };
		}
		default:
			return state;
	}
};
