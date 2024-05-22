// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useState, FormEvent } from "react";
import {
	Draggable,
	DraggableStateSnapshot,
	DraggingStyle,
	Droppable,
	NotDraggingStyle,
} from "react-beautiful-dnd";
import { TiDelete } from "react-icons/ti";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ICard } from "../../types/card";
import { IList } from "../../types/list";
import { validate } from "../../utils/validate";
import CardForm from "../CardForm/CardForm";
import CardList from "../CardList/CardList";
import MyButton from "../UI/button/MyButton/MyButton";
import MyInput from "../UI/input/MyInput";
import cl from "./LIstItem.module.scss";

interface ListItemProps {
	list: IList;
	index: number;
}

const ListItem: FC<ListItemProps> = ({ list, index }) => {
	const { cards } = useTypedSelector((state) => state.card);
	const [editMode, setEditMode] = useState(false);
	const [listTitle, setListTitle] = useState(list.title);
	const { removeList, removeCard, editListTitle } = useActions();
	const completedCards = Object.entries(cards).filter(
		([, card]) => card.isCompleted && card.listID === list.id
	);

	const getStyle = (
		style: DraggingStyle | NotDraggingStyle | undefined,
		snapshot: DraggableStateSnapshot
	) => {
		if (!snapshot.isDropAnimating) {
			return style;
		}
		return {
			...style,
			transitionDuration: `0.001s`,
		};
	};

	const handleChangeTitle = (event: FormEvent<HTMLFormElement>) => {
		if (validate(listTitle)) {
			editListTitle({ id: list.id, title: listTitle });
			setEditMode(false);
		}

		event.preventDefault();
	};

	const handleEditClose = () => {
		setEditMode(false);
		setListTitle(list.title);
	};

	const removeCompletedCards = (cards: [string, ICard][]) => {
		cards.forEach(([, card]) =>
			removeCard({ listID: card.listID, id: card.id })
		);
	};

	return (
		<div className={cl.listItem}>
			<Draggable draggableId={list.id} index={index}>
				{(provided, snapshot) => (
					<div
						className={cl.listItem__inner}
						{...provided.draggableProps}
						ref={provided.innerRef}
						{...provided.dragHandleProps}
						style={getStyle(
							provided.draggableProps.style,
							snapshot
						)}
					>
						<div className={cl.listItem__header}>
							<div
								className={cl.titleContainer}
								onClick={() => setEditMode(true)}
							>
								{editMode ? (
									<form
										className={cl.listItem__form}
										onSubmit={handleChangeTitle}
									>
										<MyInput
											value={listTitle}
											onBlur={handleEditClose}
											// eslint-disable-next-line jsx-a11y/no-autofocus
											autoFocus={true}
											onChange={setListTitle}
											className={cl.listItem__input}
										/>
									</form>
								) : (
									<h3 className={cl.listItem__title}>
										{list.title}
									</h3>
								)}
							</div>

							<TiDelete
								className={cl.listItem__icon}
								onClick={() =>
									removeList({
										boardID: list.boardID,
										listID: list.id,
									})
								}
							/>
						</div>
						<Droppable droppableId={list.id} type="card">
							{(provided) => (
								<div
									className={cl.listItem__body}
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{completedCards.length > 0 && (
										<div>
											<MyButton
												className={cl.listItem__btn}
												onClick={() =>
													removeCompletedCards(
														completedCards
													)
												}
											>
												Delete completed tasks
											</MyButton>
										</div>
									)}

									<CardList cardIDs={list.cards} />
									{provided.placeholder}
									<CardForm
										boardID={list.boardID}
										listID={list.id}
									/>
								</div>
							)}
						</Droppable>
					</div>
				)}
			</Draggable>
		</div>
	);
};

export default ListItem;
