/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, FormEvent, useState } from "react";
import {
	Draggable,
	DraggableStateSnapshot,
	DraggingStyle,
	NotDraggingStyle,
} from "react-beautiful-dnd";
import { ICard } from "../../types/card";
import MyButton from "../UI/button/MyButton/MyButton";
import { MdDone, MdDelete } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import cl from "./Card.module.scss";
import classNames from "classnames";
import { useActions } from "../../hooks/useActions";
import MyInput from "../UI/input/MyInput";
import { validate } from "../../utils/validate";

interface CardProps {
	card: ICard;
	index: number;
}

const Card: FC<CardProps> = ({ card, index }) => {
	const { completeCard, removeCard, editCardTitle } = useActions();
	const [editMode, setEditMode] = useState(false);
	const [cardTitle, setCardTitle] = useState(card.title);

	const getStyle = (
		style: DraggingStyle | NotDraggingStyle | undefined,
		snapshot: DraggableStateSnapshot
	) => {
		if (!snapshot.isDropAnimating) {
			return style;
		}
		return {
			...style,
			transitionDuration: `0.02s`,
		};
	};

	const handleChangeTitle = (event: FormEvent<HTMLFormElement>) => {
		if (validate(cardTitle)) {
			editCardTitle({ id: card.id, title: cardTitle });
			setEditMode(false);
		}

		event.preventDefault();
	};

	const handleEditOpen = () => {
		if (!card.isCompleted) setEditMode(true);
	};

	const handleEditClose = () => {
		setEditMode(false);
		setCardTitle(card.title);
	};

	const renderIconContainer = (): React.ReactNode => {
		return (
			<div className={cl.iconContainer}>
				<TiArrowBack className={classNames(cl.icon, cl.icon_return)} />
				<MyButton
					onClick={() =>
						removeCard({
							id: card.id,
							listID: card.listID,
						})
					}
				>
					<MdDelete className={classNames(cl.icon, cl.icon_remove)} />
				</MyButton>
			</div>
		);
	};

	const renderTitleContainer = (): React.ReactNode => {
		return (
			<div className={cl.titleContainer}>
				<h3
					onClick={handleEditOpen}
					className={classNames(
						cl.card__title,
						card.isCompleted ? "" : cl.card__title_hover
					)}
				>
					{card.title}
				</h3>
				<MyButton
					className={cl.card__btn}
					onClick={() => completeCard({ id: card.id })}
				>
					{card.isCompleted ? (
						renderIconContainer()
					) : (
						<MdDone
							className={classNames(cl.icon, cl.icon_complete)}
						/>
					)}
				</MyButton>
			</div>
		);
	};

	return (
		<Draggable draggableId={card.id} index={index}>
			{(provided, snapshot) => (
				<div
					className={classNames(
						cl.card,
						card.isCompleted ? cl.complete : ""
					)}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					style={getStyle(provided.draggableProps.style, snapshot)}
				>
					<div className={cl.card__inner}>
						{editMode ? (
							<form
								className={cl.card__form}
								onSubmit={handleChangeTitle}
							>
								<MyInput
									value={cardTitle}
									// eslint-disable-next-line jsx-a11y/no-autofocus
									autoFocus={true}
									onBlur={handleEditClose}
									onChange={setCardTitle}
									className={cl.card__input}
								/>
							</form>
						) : (
							renderTitleContainer()
						)}
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default Card;
