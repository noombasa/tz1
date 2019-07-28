import { put, call } from "redux-saga/effects";
import {
	downloadEmployeesServer,
	createEmployeeServer,
	editEmployeeServer
} from "../helpers/fakeServer";
import {
	createEmployeeSuccess,
	createEmployeeFail,
	downloadEmployees,
	downloadEmployeesSuccess,
	downloadEmployeesFail,
	editEmployeeSuccess,
	editEmployeeFail
} from "../actions/employees";

export function* downloadEmployeesSaga() {
	try {
		const resData = yield call(downloadEmployeesServer);
		yield put(downloadEmployeesSuccess(resData));
	} catch (e) {
		console.log(e);
		// yield put(downloadEmployeesFail(e.toString()));
	}
}
export function* createEmployeeSaga(data) {
	console.log("saga", data);
	try {
		yield createEmployeeServer(data);
		yield put(downloadEmployees());
	} catch (e) {
		console.log(e);
		// yield put(downloadEmployeesFail(e.toString()));
	}
}
export function* editEmployeeSaga(data) {
	try {
		yield editEmployeeServer(data);
		yield put(downloadEmployees());
	} catch (e) {
		console.log(e);
		// yield put(downloadEmployeesFail(e.toString()));
	}
}
