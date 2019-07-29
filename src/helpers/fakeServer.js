import { setState, getState } from "./localstorage";

export const downloadEmployeesServer = () => {
	return new Promise((resolve, reject) => {
		const response = getState();
		if (response) {
			resolve(response);
		} else {
			reject(new Error("Нет данных"));
		}
	});
};

export const createEmployeeServer = ({ data }) => {
	let employees = getState();
	employees[data.id] = data;
	setState(employees);
};
export const editEmployeeServer = ({ data }) => {
	let employees = getState();
	employees[data.id] = data;
	setState(employees);
};
