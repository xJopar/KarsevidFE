import React, { FC, FormEvent } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { validate } from "../../utils/validate";
import MyButton from "../UI/button/MyButton/MyButton";
import MyInput from "../UI/input/MyInput";
import MyPointer from "../UI/pointer/MyPointer";
import cl from "./ListForm.module.scss";

interface ListFormProps {
	boardID: string;
}

const ListForm: FC<ListFormProps> = ({ boardID }) => {
	const { inputValue, isOpen, isError } = useTypedSelector(
		(state) => state.form
	);
	const {
		submitFormSuccess,
		submitFormCancel,
		openForm,
		setInputValue,
		addList,
		submitFormError,
	} = useActions();

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (validate(inputValue)) {
			addList({
				boardID,
				id: String(Date.now()),
				title: inputValue,
			});
			submitFormSuccess();
			setInputValue("");
		} else {
			submitFormError();
		}

		event.preventDefault();
	};

	return (
		<div className={cl.container}>
			{isOpen ? (
				<form className={cl.listForm} onSubmit={handleFormSubmit}>
					<div className={cl.listForm__body}>
						<MyPointer isError={isError}>Give me a name!</MyPointer>
						<MyInput
							className={cl.listForm__input}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus={true}
							value={inputValue}
							onChange={setInputValue}
						/>
					</div>

					<div className={cl.listForm__footer}>
						<MyButton type="submit" className={cl.listForm__btn}>
							NANO
						</MyButton>
						<MyButton
							className={cl.listForm__btn}
							onClick={submitFormCancel}
						>
							Cancel
						</MyButton>
					</div>
				</form>
			) : (
				<MyButton className={cl.openBtn} onClick={openForm}>
					Add a new list...
				</MyButton>
			)}
		</div>
	);
};

export default ListForm;
