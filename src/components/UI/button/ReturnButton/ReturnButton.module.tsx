import React, { FC } from "react";
import MyButton from "../MyButton/MyButton";
import { IoReturnUpBack } from "react-icons/io5";
import cl from "./ReturnButton.module.scss";
import { useHistory } from "react-router";

interface ReturnButtonProps {
	url: string;
	children?: React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;

	onClick: () => void;
}

const ReturnButton: FC<ReturnButtonProps> = ({
	url,
	onClick,
	type,
	children,
}) => {
	const history = useHistory();

	const returnBack = () => {
		history.push(url);
		onClick();
	};

	return (
		<MyButton className={cl.returnBtn} onClick={returnBack} type={type}>
			<h2 className={cl.returnBtn__title}>{children}</h2>
			<IoReturnUpBack className={cl.returnBtn__icon} />
		</MyButton>
	);
};

export default ReturnButton;
