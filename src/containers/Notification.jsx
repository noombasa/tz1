import React from "react";
import { connect } from "react-redux";

import { removeNotification } from "../actions/notification";

import styles from "./Notification.scss";

const Notification = props => {
	const { message, removeNotification } = props;

	setTimeout(() => {
		removeNotification();
	}, 3000);

	return (
		<div className={styles.root}>
			{message && <div className="wrap">{message}</div>}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		message: state.notification.message
	};
};

const mapDispatchToProps = dispatch => ({
	removeNotification: () => dispatch(removeNotification())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Notification);
