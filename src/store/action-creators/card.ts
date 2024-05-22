import { CardAction, CardActionTypes, ICard } from "../../types/card";
import { IDragAndDrop } from "../../types/dragAndDrop";

export const addCard = ({
	boardID,
	listID,
	id: cardID,
	title,
}: ICard): CardAction => {
	return {
		type: CardActionTypes.ADD_CARD,
		payload: { boardID, listID, cardID, title },
	};
};

export const removeCard = ({
	listID,
	id: cardID,
}: {
	listID: string;
	id: string;
}): CardAction => {
	return {
		type: CardActionTypes.REMOVE_CARD,
		payload: { listID, cardID },
	};
};

export const completeCard = ({ id: cardID }: { id: string }): CardAction => {
	return { type: CardActionTypes.COMPLETE_CARD, payload: { cardID } };
};

export const editCardTitle = ({
	id: cardID,
	title,
}: {
	id: string;
	title: string;
}): CardAction => {
	return {
		type: CardActionTypes.EDIT_CARD_TITLE,
		payload: { cardID, title },
	};
};

export const setCards = (cards: { [cardID: string]: ICard }): CardAction => {
	return { type: CardActionTypes.SET_CARDS, payload: cards };
};

export const removeList = ({
	boardID,
	listID,
}: {
	boardID: string;
	listID: string;
}): CardAction => {
	return { type: CardActionTypes.REMOVE_LIST, payload: { boardID, listID } };
};

export const removeBoard = ({ boardID }: { boardID: string }) => {
	return { type: CardActionTypes.REMOVE_BOARD, payload: { boardID } };
};

export const dragAndDrop = ({
	droppableIdStart,
	droppableIdEnd,
	droppableIndexStart,
	droppableIndexEnd,
	draggableId,
	type,
	boardID,
}: IDragAndDrop): CardAction => {
	return {
		type: CardActionTypes.DRAG_DROP,
		payload: {
			droppableIdStart,
			droppableIdEnd,
			droppableIndexStart,
			droppableIndexEnd,
			draggableId,
			type,
			boardID,
		},
	};
};
