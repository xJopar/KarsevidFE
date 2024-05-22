import React, { FC } from "react";
import cl from "./MyButton.module.scss";

interface MyButtonProps {
	className?: string;
	type?: "button" | "submit" | "reset" | undefined;
	children?: React.ReactNode;

	onClick?: () => void;
	onDblClick?: () => void;
}

const MyButton: FC<MyButtonProps> = ({
	className,
	children,
	onClick,
	onDblClick,
	type,
}) => {
	return (
		<button
			className={`${cl.myBtn} ${className}`}
			type={type}
			onClick={onClick}
			onDoubleClick={onDblClick}
		>
			{children}
		</button>
	);
};

export default MyButton;
