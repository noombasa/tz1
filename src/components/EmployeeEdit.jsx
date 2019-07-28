import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import MaskedInput from "react-text-mask";
import Modal from "./Modal.jsx";
import { Redirect } from "react-router-dom";

import { optionsSelect } from "../constants/other";
import { returnDefaultValue, verification } from "../helpers/other";

import styles from "./EmployeeEdit.scss";

const EmployeeEdit = props => {
	const { employee, handler } = props;

	const [name, setName] = useState((employee && employee.name) || "");
	const [role, setRole] = useState((employee && employee.role) || "driver");
	const [phone, setPhone] = useState((employee && employee.phone) || "");
	const [birthday, setBirthday] = useState(
		(employee && employee.birthday) || ""
	);
	const [isArchive, setIsArchive] = useState(
		!!(employee && employee.isArchive)
	);

	const [isRedirect, setIsRedirect] = useState(false);
	const [error, setError] = useState("");
	const [modal, setModal] = useState({
		isOpen: false,
		title: "",
		subtitle: "",
		content: null
	});

	console.log(isRedirect);

	const save = () => {
		const clearName = name.replace(/(^\s+|\s+$)/g, "").replace(/\s+/g, " ");
		const vereficate = verification({
			name,
			role,
			birthday,
			phone,
			isArchive
		});
		const isChanged = !(
			employee &&
			(clearName === employee.name &&
				role === employee.role &&
				phone === employee.phone &&
				isArchive === employee.isArchive &&
				birthday === employee.birthday)
		);

		!isChanged &&
			setModal({
				isOpen: true,
				title: "Вы не внесли изменений",
				content: (
					<div className="footer">
						<button
							className="close"
							onClick={() => setModal({ isOpen: false })}
						>
							Вернутсья назад
						</button>
					</div>
				)
			});

		if (!vereficate.error && isChanged) {
			setModal({
				isOpen: true,
				title: `${
					!!employee ? "Сохранить изменения?" : "Добавить сотрудника?"
				}`,
				subtitle: "Проверьте данные перед отправкой.",
				content: (
					<div className="content">
						<span>Имя: {name}</span>
						<br />
						<span>Должность: {returnDefaultValue(role).label}</span>
						<br />
						<span>Телефонный номер: {phone}</span>
						<br />
						<span>Дата рождения: {birthday}</span>
						<br />
						<span>{isArchive ? "В архиве" : "Не в архиве"}</span>
						<div className="footer">
							<button
								className="close"
								onClick={() => setModal({ isOpen: false })}
							>
								Отмена
							</button>
							<button
								className="save"
								onClick={() => useHandler()}
							>
								Подтвердить
							</button>
						</div>
					</div>
				)
			});
		} else {
			setError(vereficate);
		}
	};

	const useHandler = () => {
		console.log(1);
		handler({
			id: (employee && employee.id) || Date.now(),
			name: name.replace(/(^\s+|\s+$)/g, "").replace(/\s+/g, " "),
			role,
			birthday,
			phone,
			isArchive
		});
		console.log(2);
		setIsRedirect(true);
		console.log(3);
	};

	return (
		<>
			{isRedirect && (
				<Redirect
					to={{
						pathname: "/employees"
					}}
				/>
			)}
			<section className={styles.root}>
				<h1>
					{employee
						? "Редактирование профиля"
						: "Добавление нового сотрудника"}
				</h1>
				<div className="form">
					{error.error && (
						<div className="error">{error.errorMsg}</div>
					)}
					<div className="wrap">
						<div className="fieldName">Имя</div>
						<div
							className={`field input ${error.type === "name" &&
								"errorInput"}`}
						>
							<input
								type="text"
								placeholder="Имя Фамилия"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>
					</div>
					<div className="wrap">
						<div className="fieldName">Дата рождения</div>
						<div
							className={`field input ${error.type ===
								"birthday" && "errorInput"}`}
						>
							<MaskedInput
								value={birthday}
								placeholder="Дата рождения"
								onChange={e => setBirthday(e.target.value)}
								mask={[
									/[0-3]/,
									/[0-9]/,
									".",
									/[0-1]/,
									/[0-9]/,
									".",
									/[0-9]/,
									/[0-9]/,
									/[0-9]/,
									/[0-9]/
								]}
							/>
						</div>
					</div>
					<div className="wrap">
						<div className="fieldName">Телефонный номер</div>
						<div
							className={`field input ${error.type === "phone" &&
								"errorInput"}`}
						>
							<MaskedInput
								value={phone}
								placeholder="+_ (___) ___-____"
								onChange={e => setPhone(e.target.value)}
								mask={[
									"+",
									/[1-9]/,
									" ",
									"(",
									/[1-9]/,
									/\d/,
									/\d/,
									")",
									" ",
									/\d/,
									/\d/,
									/\d/,
									"-",
									/\d/,
									/\d/,
									/\d/,
									/\d/
								]}
							/>
						</div>
					</div>
					<div className="wrap">
						<div className="fieldName">Профессия</div>
						<div className="field">
							<div className="select">
								<Select
									defaultValue={returnDefaultValue(role)}
									options={optionsSelect}
									onChange={value => setRole(value.value)}
								/>
							</div>
						</div>
					</div>
					<div className="wrap">
						<div className="fieldName">Архив</div>
						<div className="field">
							<input
								type="checkbox"
								className="checkbox"
								checked={isArchive}
								value={isArchive}
								onChange={e => setIsArchive(e.target.checked)}
							/>
						</div>
					</div>
					<div className="footer">
						<Link
							className="button gray"
							to={{ pathname: `/employees` }}
						>
							Отмена
						</Link>
						<button className="button green" onClick={() => save()}>
							Сохранить
						</button>
					</div>
				</div>
			</section>
			{modal.isOpen && (
				<Modal title={modal.title} subtitle={modal.subtitle}>
					{modal.content}
				</Modal>
			)}
		</>
	);
};

export default EmployeeEdit;
