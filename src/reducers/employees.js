import {
	DOWNLOAD_EMPLOYEES_SUCCESS,
	DOWNLOAD_EMPLOYEES_FAIL
} from "../constants/actionEmployees";

const initialState = {
	employees: {},
	error: false,
	msg: ""
};

export const employees = (state = initialState, action) => {
	// console.log("Reducer data:", action.data);
	switch (action.type) {
		case DOWNLOAD_EMPLOYEES_SUCCESS: {
			return {
				employees: action.employees,
				error: false,
				msg: ""
			};
		}
		case DOWNLOAD_EMPLOYEES_FAIL: {
			return {
				employees: {},
				errorMsg: action.errorMsg
			};
		}
		default: {
			return state;
		}
	}
};
