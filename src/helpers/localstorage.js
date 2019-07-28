import { fakeEmployees } from "../constants/fakeEmployees";

export const setState = state => {
	const employees = JSON.stringify(state);
	localStorage.setItem("employees", employees);
};

export const getState = () => {
	const employees = localStorage.getItem("employees");
	return JSON.parse(employees);
};

export const initFakeData = () => {
	const employees = getState();
	if (!employees) {
		setState(fakeEmployees);
	}
};
