import {
	DOWNLOAD_EMPLOYEES_SUCCESS,
	DOWNLOAD_EMPLOYEES_FAIL
} from "../constants/actionEmployees";

const initialState = {
	employees: {}
};

export const employees = (state = initialState, action) => {
	switch (action.type) {
		case DOWNLOAD_EMPLOYEES_SUCCESS: {
			return {
				employees: action.employees
			};
		}
		case DOWNLOAD_EMPLOYEES_FAIL: {
			return {
				employees: {}
			};
		}
		default: {
			return state;
		}
	}
};
