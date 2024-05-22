import React, { FC } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ListItem from "../ListItem/ListItem";
import cl from "./Lists.module.scss";

interface ListsProps {
	listIDs: string[];
	boardID: string;
}

const Lists: FC<ListsProps> = ({ boardID, listIDs }) => {
	const { lists } = useTypedSelector((state) => state.list);
	const { dragAndDrop } = useActions();

	const handleOnDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const { destination, source, draggableId, type } = result;

		dragAndDrop({
			droppableIdStart: source.droppableId,
			droppableIdEnd: destination.droppableId,
			droppableIndexStart: source.index,
			droppableIndexEnd: destination.index,
			draggableId,
			type,
			boardID,
		});
	};

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable droppableId="lists" type="list" direction="horizontal">
				{(provided) => (
					<div
						className={cl.lists}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{listIDs.length > 0 &&
							listIDs.map((listID: string, index: number) => {
								const list = lists[listID];
								if (list)
									return (
										<ListItem
											key={listID}
											list={list}
											index={index}
										/>
									);
							})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Lists;
