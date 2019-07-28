import {
	CREATE_EMPLOYEE,
	CREATE_EMPLOYEE_SUCCESS,
	CREATE_EMPLOYEE_FAIL,
	DOWNLOAD_EMPLOYEES,
	DOWNLOAD_EMPLOYEES_SUCCESS,
	DOWNLOAD_EMPLOYEES_FAIL,
	EDIT_EMPLOYEE,
	EDIT_EMPLOYEE_SUCCESS,
	EDIT_EMPLOYEE_FAIL
} from "../constants/actionEmployees";

export const createEmployee = data => {
	console.log("act", data);
	return {
		type: CREATE_EMPLOYEE,
		data
	};
};

export const createEmployeeSuccess = () => ({
	type: CREATE_EMPLOYEE_SUCCESS
});

export const createEmployeeFail = errMsg => ({
	type: CREATE_EMPLOYEE_FAIL,
	errMsg
});

export const downloadEmployees = () => ({
	type: DOWNLOAD_EMPLOYEES
});

export const downloadEmployeesSuccess = employees => {
	return {
		type: DOWNLOAD_EMPLOYEES_SUCCESS,
		employees
	};
};

export const downloadEmployeesFail = errMsg => {
	return {
		type: DOWNLOAD_EMPLOYEES_FAIL,
		errMsg
	};
};
export const editEmployee = data => ({
	type: EDIT_EMPLOYEE,
	data
});

export const editEmployeeSuccess = () => ({
	type: EDIT_EMPLOYEE_SUCCESS
});

export const editEmployeeFail = errMsg => ({
	type: EDIT_EMPLOYEE_FAIL,
	errMsg
});
