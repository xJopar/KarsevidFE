import classNames from "classnames";
import React, { FC, useState, FormEvent } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { VscEdit } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { validate } from "../../utils/validate";
import MyButton from "../UI/button/MyButton/MyButton";
import MyInput from "../UI/input/MyInput";
import cl from "./Board.module.scss";

interface BoardProps {
	id: string;
	title: string;
}

const Board: FC<BoardProps> = ({ id, title }) => {
	const { removeBoard, submitFormCancel, editBoardTitle } = useActions();
	const [editMode, setEditMode] = useState(false);
	const [boardTitle, setBoardTitle] = useState(title);

	const handleChangeTitle = (event: FormEvent<HTMLFormElement>) => {
		if (validate(boardTitle)) {
			editBoardTitle({ id, title: boardTitle });
			setEditMode(false);
		}

		event.preventDefault();
	};

	const handleEditClose = () => {
		setEditMode(false);
		setBoardTitle(title);
	};

	const renderBoardContainer = (): React.ReactNode => {
		return (
			<div className={cl.boardContainer}>
				<MyButton
					className={classNames(cl.board__btn, cl.board__btn_edit)}
					onClick={() => setEditMode(true)}
				>
					<VscEdit className={cl.board__icon} />
				</MyButton>
				<NavLink
					className={cl.board__link}
					to={`/${id}`}
					onClick={() => submitFormCancel()}
				>
					<h2 className={cl.board__title}>{title}</h2>
				</NavLink>
				<MyButton
					className={classNames(cl.board__btn, cl.board__btn_remove)}
					onClick={() => removeBoard({ boardID: id })}
				>
					<RiDeleteBin2Line className={cl.board__icon} />
				</MyButton>
			</div>
		);
	};

	return (
		<div className={cl.board}>
			<div className={cl.board__inner}>
				{editMode ? (
					<form
						className={cl.board__form}
						onSubmit={handleChangeTitle}
					>
						<MyInput
							value={boardTitle}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus={true}
							onBlur={handleEditClose}
							onChange={setBoardTitle}
							className={cl.board__input}
						/>
					</form>
				) : (
					renderBoardContainer()
				)}
			</div>
		</div>
	);
};

export default Board;
