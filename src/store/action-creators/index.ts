import * as BoardActionCreators from "./board";
import * as FormActionCreators from "./form";
import * as ListActionCreators from "./list";
import * as CardActionCreators from "./card";

export default {
	...BoardActionCreators,
	...FormActionCreators,
	...ListActionCreators,
	...CardActionCreators,
};
