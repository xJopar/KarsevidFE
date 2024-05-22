import { IDragAndDrop } from "../../types/dragAndDrop";
import { IList, ListAction, ListActionTypes } from "../../types/list";

export const addList = ({
	boardID,
	id: listID,
	title,
}: {
	boardID: string;
	id: string;
	title: string;
}): ListAction => {
	return {
		type: ListActionTypes.ADD_LIST,
		payload: { boardID, listID, title },
	};
};

export const removeList = ({
	boardID,
	id: listID,
}: {
	boardID: string;
	id: string;
}): ListAction => {
	return { type: ListActionTypes.REMOVE_LIST, payload: { boardID, listID } };
};

export const editListTitle = ({
	id: listID,
	title,
}: {
	id: string;
	title: string;
}): ListAction => {
	return {
		type: ListActionTypes.EDIT_LIST_TITLE,
		payload: { listID, title },
	};
};

export const setLists = (lists: { [listID: string]: IList }): ListAction => {
	return { type: ListActionTypes.SET_LISTS, payload: lists };
};

export const removeBoard = ({ boardID }: { boardID: string }): ListAction => {
	return { type: ListActionTypes.REMOVE_BOARD, payload: { boardID } };
};

export const addCard = ({
	listID,
	cardID,
}: {
	listID: string;
	cardID: string;
}): ListAction => {
	return { type: ListActionTypes.ADD_CARD, payload: { listID, cardID } };
};

export const removeCard = ({
	listID,
	cardID,
}: {
	listID: string;
	cardID: string;
}): ListAction => {
	return { type: ListActionTypes.REMOVE_CARD, payload: { listID, cardID } };
};

export const dragAndDrop = ({
	droppableIdStart,
	droppableIdEnd,
	droppableIndexStart,
	droppableIndexEnd,
	draggableId,
	type,
	boardID,
}: IDragAndDrop): ListAction => {
	return {
		type: ListActionTypes.DRAG_DROP,
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
