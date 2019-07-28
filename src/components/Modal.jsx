import React from "react";
import styles from "./Modal.scss";

const Modal = props => {
	const { title, subtitle } = props;

	return (
		<div className={styles.root}>
			<div className="background" />
			<div className="wrapper">
				<div className="modal">
					<h3>{title}</h3>
					<hr />
					<p>{subtitle}</p>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
