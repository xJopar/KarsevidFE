import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "../espacios/action-creators"; 

export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(ActionCreators, dispatch);
};
