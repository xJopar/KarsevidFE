import { ListActionTypes, ListAction, ListState } from "../../types/list";

const initialState: ListState = {
	lists: {},
};

export const listReducer = (
	state = initialState,
	action: ListAction
): ListState => {
	switch (action.type) {
		case ListActionTypes.ADD_LIST: {
			const { boardID, listID, title } = action.payload;
			const newList = {
				boardID,
				id: listID,
				title,
				cards: [],
			};

			return {
				...state,
				lists: { ...state.lists, [listID]: newList },
			};
		}
		case ListActionTypes.REMOVE_LIST: {
			const { listID } = action.payload;
			const lists = { ...state.lists };

			delete lists[listID];

			return { ...state, lists };
		}
		case ListActionTypes.EDIT_LIST_TITLE: {
			const { listID, title } = action.payload;
			const list = state.lists[listID];

			list.title = title;

			return { ...state, lists: { ...state.lists, [listID]: list } };
		}
		case ListActionTypes.SET_LISTS: {
			return { ...state, lists: action.payload };
		}
		case ListActionTypes.REMOVE_BOARD: {
			const { boardID } = action.payload;
			const newLists = Object.entries(state.lists).filter(
				([listID, list]) => {
					if (list.boardID !== boardID) return [listID, list];
				}
			);

			return { ...state, lists: Object.fromEntries(newLists) };
		}
		case ListActionTypes.ADD_CARD: {
			const { listID, cardID } = action.payload;
			const list = state.lists[listID];

			list.cards.push(cardID);

			return { ...state, lists: { ...state.lists, [listID]: list } };
		}
		case ListActionTypes.REMOVE_CARD: {
			const { listID, cardID } = action.payload;
			const list = state.lists[listID];
			const newCards = list.cards.filter((card) => card !== cardID);
			list.cards = newCards;

			return { ...state, lists: { ...state.lists, [listID]: list } };
		}
		case ListActionTypes.DRAG_DROP: {
			const {
				droppableIdStart,
				droppableIdEnd,
				droppableIndexStart,
				droppableIndexEnd,
				type,
			} = action.payload;

			if (type === "list") return state;

			if (droppableIdStart === droppableIdEnd) {
				const list = state.lists[droppableIdStart];
				const [reorderedCard] = list.cards.splice(
					droppableIndexStart,
					1
				);

				list.cards.splice(droppableIndexEnd, 0, reorderedCard);

				return {
					...state,
					lists: { ...state.lists, [droppableIdStart]: list },
				};
			} else {
				const startList = state.lists[droppableIdStart];
				const endList = state.lists[droppableIdEnd];
				const [reorderedCard] = startList.cards.splice(
					droppableIndexStart,
					1
				);
				endList.cards.splice(droppableIndexEnd, 0, reorderedCard);

				return {
					...state,
					lists: {
						...state.lists,
						[droppableIdStart]: startList,
						[droppableIdEnd]: endList,
					},
				};
			}
		}
		default:
			return state;
	}
};
