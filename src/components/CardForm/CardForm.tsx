import classNames from "classnames";
import React, { FC, FormEvent, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { validate } from "../../utils/validate";
import MyInput from "../UI/input/MyInput";
import cl from "./CardForm.module.scss";

interface CardFormProps {
	boardID: string;
	listID: string;
}

const CardForm: FC<CardFormProps> = ({ boardID, listID }) => {
	const { addCard } = useActions();
	const [inputValue, setInputValue] = useState("");
	const [isError, setIsError] = useState(false);

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (validate(inputValue)) {
			addCard({
				boardID,
				listID,
				id: String(Date.now()),
				title: inputValue,
				isCompleted: false,
			});
			setInputValue("");
		} else {
			setIsError(true);
			setTimeout(() => setIsError(false), 1000);
		}

		event.preventDefault();
	};

	return (
		<form className={cl.cardForm} onSubmit={handleFormSubmit}>
			<MyInput
				className={classNames(
					cl.cardForm__input,
					isError ? cl.error : ""
				)}
				value={inputValue}
				onChange={setInputValue}
			/>
		</form>
	);
};

export default CardForm;
