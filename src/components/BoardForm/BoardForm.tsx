import React, { FC, FormEvent } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { validate } from "../../utils/validate";
import MyButton from "../UI/button/MyButton/MyButton";
import MyInput from "../UI/input/MyInput";
import MyLabel from "../UI/label/MyLabel";
import MyPointer from "../UI/pointer/MyPointer";
import cl from "./BoardForm.module.scss";

const BoardForm: FC = () => {
	const { inputValue, isOpen, isError } = useTypedSelector(
		(state) => state.form
	);
	const {
		submitFormCancel,
		submitFormSuccess,
		openForm,
		setInputValue,
		submitFormError,
		addBoard,
	} = useActions();

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		if (validate(inputValue)) {
			addBoard({ id: String(Date.now()), title: inputValue });
			submitFormSuccess();
		} else {
			submitFormError();
		}

		event.preventDefault();
	};

	return (
		<div className={cl.container}>
			{isOpen ? (
				<form className={cl.boardForm} onSubmit={handleFormSubmit}>
					<div className={cl.boardForm__header}>
						<h2 className={cl.boardForm__title}>
							Crea un nuevo tablero...
						</h2>
						<MyButton type="button">
							<VscChromeClose
								className={cl.boardForm__icon}
								onClick={() => submitFormCancel()}
							/>
						</MyButton>
					</div>
					<div className={cl.boardForm__body}>
						<MyLabel id="formInput">Board name</MyLabel>
						<MyPointer isError={isError}>Give me a name!</MyPointer>
						<MyInput
							id="formInput"
							className={cl.boardForm__input}
							// eslint-disable-next-line jsx-a11y/no-autofocus
							autoFocus={true}
							value={inputValue}
							onChange={setInputValue}
						/>
					</div>
					<div className={cl.boardForm__footer}>
						<MyButton className={cl.boardForm__btn} type="submit">
							Create
						</MyButton>
					</div>
				</form>
			) : (
				<MyButton
					className={cl.openBtn}
					type="submit"
					onClick={() => openForm()}
				>
					<h2 className={cl.openBtn__title}>OOO a new board...</h2>
				</MyButton>
			)}
		</div>
	);
};

export default BoardForm;
