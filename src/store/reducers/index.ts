import { combineReducers } from "redux";
import { boardReducer } from "./boardReducer";
import { cardReducer } from "./cardReducer";
import { formReducer } from "./formReducer";
import { listReducer } from "./listReducer";

export const rootReducer = combineReducers({
	form: formReducer,
	board: boardReducer,
	list: listReducer,
	card: cardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
