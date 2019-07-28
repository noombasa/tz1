import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { downloadEmployees } from "../actions/employees";
import { initFakeData } from "../helpers/localstorage";

import Home from "./Home.jsx";
import ErrorPage from "./ErrorPage.jsx";
import EmployeesContainer from "../containers/EmployeesContainer.jsx";
import EmployeeEditContainer from "../containers/EmployeeEditContainer.jsx";
import CreateEmployeeContainer from "../containers/CreateEmployeeContainer.jsx";

const Body = props => {
	initFakeData();
	props.downloadEmployees();
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/employees" component={EmployeesContainer} />
			<Route
				exact
				path="/employees/create"
				component={CreateEmployeeContainer}
			/>
			<Route
				path={"/employees/edit/:id"}
				component={EmployeeEditContainer}
			/>
			<Route component={ErrorPage} />
		</Switch>
	);
};

const mapDispatchToProps = dispatch => ({
	downloadEmployees: () => dispatch(downloadEmployees())
});

export default connect(
	null,
	mapDispatchToProps
)(Body);
