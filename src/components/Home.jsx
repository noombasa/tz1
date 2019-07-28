import React from "react";
import { Redirect } from "react-router-dom";

const Body = () => {
	return (
		<Redirect
			to={{
				pathname: "/employees"
			}}
		/>
	);
};

export default Body;
