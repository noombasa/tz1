import React from "react";
import { connect } from "react-redux";

import { downloadEmployees } from "../actions/employees";
import Employees from "../components/Employees.jsx";

const EmployeesContainer = props => {
	return <Employees {...props} />;
};

const mapStateToProps = state => ({
	employees: state.employees.employees,
	errorMsg: state.employees.errorMsg
});

export default connect(
	mapStateToProps,
	null
)(EmployeesContainer);
