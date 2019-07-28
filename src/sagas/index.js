import { takeEvery } from "redux-saga/effects";
import {
	CREATE_EMPLOYEE,
	DOWNLOAD_EMPLOYEES,
	EDIT_EMPLOYEE
} from "../constants/actionEmployees";

import {
	downloadEmployeesSaga,
	createEmployeeSaga,
	editEmployeeSaga
} from "./employees";

export default function* rootSaga() {
	yield takeEvery(DOWNLOAD_EMPLOYEES, downloadEmployeesSaga);
	yield takeEvery(CREATE_EMPLOYEE, createEmployeeSaga);
	yield takeEvery(EDIT_EMPLOYEE, editEmployeeSaga);
}
