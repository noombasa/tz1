import React from "react";
import { connect } from "react-redux";

import { downloadEmployees } from "../actions/employees";
import Employees from "../components/Employees.jsx";

const EmployeesContainer = props => <Employees {...props} />;

const mapStateToProps = state => ({
	employees: state.employees.employees
});

export default connect(
	mapStateToProps,
	null
)(EmployeesContainer);
