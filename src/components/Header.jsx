import React, { useState } from "react";

import styles from "./Header.scss";

const Header = () => {
	return (
		<header className={styles.root}>
			<div className="container">
				<div className="logo">
					<a href="/" />
				</div>
				<h2>Pizza TZ</h2>
			</div>
		</header>
	);
};

export default Header;
