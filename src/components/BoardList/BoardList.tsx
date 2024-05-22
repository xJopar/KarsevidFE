import React, { FC } from "react";
import { IBoard } from "../../types/board";
import Board from "../Board/Board";
import cl from "./BoardList.module.scss";

interface BoardListProps {
	boards: [boardID: string, board: IBoard][];
}

const BoardList: FC<BoardListProps> = ({ boards }) => {
	return (
		<div className={cl.boardList}>
			<h2 className={cl.boardList__title}>Your boards</h2>
			<div className={cl.container}>
				{boards.map(([boardID, board]) => (
					<Board key={boardID} id={board.id} title={board.title} />
				))}
			</div>
		</div>
	);
};

export default BoardList;
