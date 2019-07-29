import {
	CREATE_EMPLOYEE,
	DOWNLOAD_EMPLOYEES,
	DOWNLOAD_EMPLOYEES_SUCCESS,
	DOWNLOAD_EMPLOYEES_FAIL,
	EDIT_EMPLOYEE
} from "../constants/actionEmployees";

export const createEmployee = data => ({
	type: CREATE_EMPLOYEE,
	data
});

export const downloadEmployees = () => ({
	type: DOWNLOAD_EMPLOYEES
});

export const downloadEmployeesSuccess = employees => ({
	type: DOWNLOAD_EMPLOYEES_SUCCESS,
	employees
});

export const downloadEmployeesFail = () => ({
	type: DOWNLOAD_EMPLOYEES_FAIL
});

export const editEmployee = data => ({
	type: EDIT_EMPLOYEE,
	data
});
