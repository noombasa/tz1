import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { initFakeData } from "../helpers/localstorage";
import { downloadEmployees } from "../actions/employees";

import Home from "../components/Home.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import EmployeesContainer from "./EmployeesContainer.jsx";
import EmployeeEditContainer from "./EmployeeEditContainer.jsx";
import CreateEmployeeContainer from "./CreateEmployeeContainer.jsx";
import Notification from "./Notification.jsx";

const Body = props => {
	useEffect(() => {
		initFakeData();
		props.downloadEmployees();
	}, []);

	return (
		<>
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
			<Notification />
		</>
	);
};

const mapDispatchToProps = dispatch => ({
	downloadEmployees: () => dispatch(downloadEmployees())
});

export default connect(
	null,
	mapDispatchToProps
)(Body);
