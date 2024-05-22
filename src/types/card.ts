import { IDragAndDrop } from "./dragAndDrop";

export interface ICard {
	boardID: string;
	listID: string;
	id: string;
	title: string;
	isCompleted: boolean;
}

export interface CardState {
	cards: {
		[cardID: string]: ICard;
	};
}

export enum CardActionTypes {
	ADD_CARD = "ADD_CARD",
	REMOVE_CARD = "REMOVE_CARD",
	COMPLETE_CARD = "COMPLETE_CARD",
	EDIT_CARD_TITLE = "EDIT_CARD_TITLE",
	SET_CARDS = "SET_CARDS",
	REMOVE_LIST = "REMOVE_LIST",
	REMOVE_BOARD = "REMOVE_BOARD",
	DRAG_DROP = "DRAG_DROP",
}

interface AddCardAction {
	type: CardActionTypes.ADD_CARD;
	payload: { boardID: string; listID: string; cardID: string; title: string };
}

interface RemoveCardAction {
	type: CardActionTypes.REMOVE_CARD;
	payload: { listID: string; cardID: string };
}

interface CompleteCardAction {
	type: CardActionTypes.COMPLETE_CARD;
	payload: { cardID: string };
}

interface EditCardTitleAction {
	type: CardActionTypes.EDIT_CARD_TITLE;
	payload: { cardID: string; title: string };
}

interface SetCardsAction {
	type: CardActionTypes.SET_CARDS;
	payload: { [cardID: string]: ICard };
}

interface RemoveListAction {
	type: CardActionTypes.REMOVE_LIST;
	payload: { boardID: string; listID: string };
}

interface RemoveBoardAction {
	type: CardActionTypes.REMOVE_BOARD;
	payload: { boardID: string };
}

interface DragAndDropAction {
	type: CardActionTypes.DRAG_DROP;
	payload: IDragAndDrop;
}

export type CardAction =
	| AddCardAction
	| RemoveCardAction
	| CompleteCardAction
	| EditCardTitleAction
	| SetCardsAction
	| RemoveListAction
	| RemoveBoardAction
	| DragAndDropAction;
