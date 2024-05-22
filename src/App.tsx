import React, { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useActions } from "./hooks/useActions";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { getState, setState } from "./utils/localStorage";
import "./styles/App.scss";

const App: FC = () => {
	const { boards } = useTypedSelector((state) => state.board);
	const { lists } = useTypedSelector((state) => state.list);
	const { cards } = useTypedSelector((state) => state.card);
	const { setBoards, setLists, setCards } = useActions();

	useEffect(() => {
		const localStorageCollection = getState();

		if (localStorageCollection) {
			const { boards, lists, cards } = localStorageCollection;

			setBoards(boards);
			setLists(lists);
			setCards(cards);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setState({ boards, lists, cards });
	}, [boards, lists, cards]);

	return (
		<div className="app">
			<BrowserRouter>
				<AppRouter/>
			</BrowserRouter>
		</div>
	);
};

export default App;
