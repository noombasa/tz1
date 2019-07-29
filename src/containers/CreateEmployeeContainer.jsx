import React from "react";
import { connect } from "react-redux";

import EmployeeEdit from "../components/EmployeeEdit.jsx";
import { createEmployee } from "../actions/employees";

const CreateEmployeeContainer = props => {
	const { createEmployee } = props;
	return <EmployeeEdit handler={createEmployee} />;
};

const mapDispatchToProps = dispatch => ({
	createEmployee: data => dispatch(createEmployee(data))
});

export default connect(
	null,
	mapDispatchToProps
)(CreateEmployeeContainer);
