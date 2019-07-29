import { combineReducers } from "redux";

import { employees } from "./employees";
import { notification } from "./notification";

export default combineReducers({
	employees,
	notification
});
