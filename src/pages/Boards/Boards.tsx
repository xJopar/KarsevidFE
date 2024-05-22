import classNames from "classnames";
import React, { FC } from "react";
import BoardForm from "../../components/BoardForm/BoardForm";
import BoardList from "../../components/BoardList/BoardList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import cl from "./Boards.module.scss";

const Boards: FC = () => {
	const { boards } = useTypedSelector((state) => state.board);

	return (
		<div className={cl.container}>
			<div className={cl.boards}>
				<div className={classNames(cl.row, cl.row_form)}>
					<BoardForm />
				</div>

				{Object.keys(boards).length > 0 && (
					<div className={classNames(cl.row, cl.row_list)}>
						<BoardList boards={Object.entries(boards)} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Boards;
