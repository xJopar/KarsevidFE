import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Card from "../Card/Card";
import cl from "./CardList.module.scss";

interface CardListProps {
	cardIDs: string[];
}

const CardList: FC<CardListProps> = ({ cardIDs }) => {
	const { cards } = useTypedSelector((state) => state.card);

	return (
		<div className={cl.cardList}>
			{cardIDs.length > 0 &&
				cardIDs.map((cardID: string, index: number) => {
					const card = cards[cardID];
					if (card)
						return <Card key={card.id} card={card} index={index} />;
				})}
		</div>
	);
};

export default CardList;
