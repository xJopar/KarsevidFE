import { IBoard } from "../types/board";
import { ICard } from "../types/card";
import { IList } from "../types/list";

export const getState = () => {
	try {
		const stateCollection = localStorage.getItem("boardsCollection");

		if (stateCollection === null) {
			return undefined;
		}

		return JSON.parse(stateCollection);
	} catch (e) {
		return undefined;
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setState = ({
	boards,
	lists,
	cards,
}: {
	boards: { [boardID: string]: IBoard };
	lists: { [listID: string]: IList };
	cards: { [cardID: string]: ICard };
}) => {
	try {
		const localStorageCollection = {
			boards,
			lists,
			cards,
		};
		localStorage.setItem(
			"boardsCollection",
			JSON.stringify(localStorageCollection)
		);
	} catch (e) {
		throw e;
	}
};
