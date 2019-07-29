import { put, call } from "redux-saga/effects";
import {
	downloadEmployeesServer,
	createEmployeeServer,
	editEmployeeServer
} from "../helpers/fakeServer";
import {
	downloadEmployees,
	downloadEmployeesSuccess,
	downloadEmployeesFail
} from "../actions/employees";
import { addNotification } from "../actions/notification";

export function* downloadEmployeesSaga() {
	try {
		const resData = yield call(downloadEmployeesServer);
		yield put(downloadEmployeesSuccess(resData));
	} catch (e) {
		console.log(e);
		yield put(downloadEmployeesFail(resData));
		yield put(addNotification("При загрузке данных произошла ошибка"));
	}
}
export function* createEmployeeSaga(data) {
	try {
		yield createEmployeeServer(data);
		yield put(downloadEmployees());
		yield put(addNotification("Сотрудник успешно добавлен"));
	} catch (e) {
		console.log(e);
		yield put(
			addNotification("При добавлении сотрудника произошла ошибка")
		);
	}
}
export function* editEmployeeSaga(data) {
	try {
		yield editEmployeeServer(data);
		yield put(downloadEmployees());
		yield put(addNotification("Редактирование прошло успешно"));
	} catch (e) {
		console.log(e);
		yield put(
			addNotification("При добавлении сотрудника произошла ошибка")
		);
	}
}
