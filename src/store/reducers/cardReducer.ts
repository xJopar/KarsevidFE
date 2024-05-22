import { CardAction, CardActionTypes, CardState } from "../../types/card";

const initialState: CardState = {
	cards: {},
};

export const cardReducer = (
	state = initialState,
	action: CardAction
): CardState => {
	switch (action.type) {
		case CardActionTypes.ADD_CARD: {
			const { boardID, listID, cardID, title } = action.payload;
			const newCard = {
				boardID,
				listID,
				id: cardID,
				title,
				isCompleted: false,
			};

			return {
				...state,
				cards: { ...state.cards, [cardID]: newCard },
			};
		}
		case CardActionTypes.REMOVE_CARD: {
			const { listID, cardID } = action.payload;
			const cards = { ...state.cards };

			if (cards[cardID].listID === listID) delete cards[cardID];

			return { ...state, cards };
		}
		case CardActionTypes.COMPLETE_CARD: {
			const { cardID } = action.payload;
			const card = state.cards[cardID];

			if (!card) return state;

			if (card.isCompleted) card.isCompleted = false;
			else card.isCompleted = true;

			return { ...state, cards: { ...state.cards, [cardID]: card } };
		}
		case CardActionTypes.EDIT_CARD_TITLE: {
			const { cardID, title } = action.payload;
			const card = state.cards[cardID];

			card.title = title;

			return {
				...state,
				cards: {
					...state.cards,
					[cardID]: card,
				},
			};
		}
		case CardActionTypes.SET_CARDS: {
			return { ...state, cards: action.payload };
		}
		case CardActionTypes.REMOVE_LIST: {
			const { listID } = action.payload;
			const newCards = Object.entries(state.cards).filter(
				([cardID, card]) => {
					if (card.listID !== listID) return [cardID, card];
				}
			);

			return { ...state, cards: Object.fromEntries(newCards) };
		}
		case CardActionTypes.REMOVE_BOARD: {
			const { boardID } = action.payload;
			const newCards = Object.entries(state.cards).filter(
				([cardID, card]) => {
					if (card.boardID !== boardID) return [cardID, card];
				}
			);

			return { ...state, cards: Object.fromEntries(newCards) };
		}
		case CardActionTypes.DRAG_DROP: {
			const { droppableIdStart, droppableIdEnd, draggableId, type } =
				action.payload;

			if (type !== "card") return state;
			if (droppableIdStart === droppableIdEnd) return state;

			const reorderedCard = state.cards[draggableId];
			reorderedCard.listID = droppableIdEnd;

			return {
				...state,
				cards: { ...state.cards, [draggableId]: reorderedCard },
			};
		}
		default:
			return state;
	}
};
