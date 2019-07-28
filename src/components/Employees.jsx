import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaRegPlusSquare } from "react-icons/fa";
import Select from "react-select";

import { optionsSelect } from "../constants/other";
import { returnDefaultValue } from "../helpers/other";
import { parseDate } from "../helpers/other.js";

import styles from "./Employees.scss";

const Employees = props => {
	const { employees, errorMsg } = props;
	const [filterRole, setFilterRole] = useState();
	const [isSort, setIsSort] = useState(false);
	const [typeSort, setTypeSort] = useState();
	const [filterArchive, setFilterArchive] = useState();

	const sortFunc = (a, b) => {
		const aName = a.name.split(" ")[1];
		const bName = b.name.split(" ")[1];
		const aBirthday = parseDate(a.birthday);
		const bBirthday = parseDate(b.birthday);

		switch (typeSort) {
			case "nameUp": {
				if (aName > bName) {
					return 1;
				} else {
					return -1;
				}
			}
			case "nameDown": {
				if (aName < bName) {
					return 1;
				} else {
					return -1;
				}
			}
			case "ageUp": {
				if (aBirthday > bBirthday) {
					return 1;
				} else {
					return -1;
				}
			}
			case "ageDown": {
				if (aBirthday < bBirthday) {
					return 1;
				} else {
					return -1;
				}
			}
			default: {
				return true;
			}
		}
	};

	const filterFunc = value => {
		const filterRoleResult = filterRole
			? Object.values(filterRole)
					.map(elem => elem.value)
					.includes(value.role)
			: true;

		const filterArchiveResult = filterArchive
			? filterArchive.value === value.isArchive
			: true;

		return filterRoleResult && filterArchiveResult;
	};

	return (
		<section className={styles.root}>
			<h1>Список сотрудников</h1>
			<div className="addEmployee">
				<Link className="button" to={{ pathname: "/employees/create" }}>
					<FaRegPlusSquare size={30} />
					<p>Добавить нового сотрудникака</p>
				</Link>
			</div>
			<div className="list">
				<div className="row header filters sFilters">
					<p>Фильтры:</p>
					<div className="wrap">
						<div className="roleFilter">
							<Select
								closeMenuOnSelect={false}
								isMulti
								isClearable={false}
								placeholder="Должности"
								options={optionsSelect}
								onChange={value => setFilterRole(value)}
							/>
						</div>
						<div className="archiveFilter">
							<Select
								placeholder="Архив"
								isClearable
								options={[
									{ value: false, label: "Активны" },
									{ value: true, label: "В архиве" }
								]}
								onChange={value => setFilterArchive(value)}
							/>
						</div>
					</div>
				</div>
				<div className="row header table">
					<div className="name table">
						Имя
						<div className="sort">
							<FaAngleUp
								color={typeSort === "nameUp" ? "red" : "black"}
								onClick={() => setTypeSort("nameUp")}
							/>
							<FaAngleDown
								color={
									typeSort === "nameDown" ? "red" : "black"
								}
								onClick={() => setTypeSort("nameDown")}
							/>
						</div>
					</div>
					<div className="role table">Должность</div>
					<div className="phone table">Телефонный номер</div>
					<div className="age table">
						Дата рождения
						<div className="sort">
							<FaAngleUp
								color={typeSort === "ageUp" ? "red" : "black"}
								onClick={() => {
									setTypeSort("ageUp");
								}}
							/>
							<FaAngleDown
								color={typeSort === "ageDown" ? "red" : "black"}
								onClick={() => setTypeSort("ageDown")}
							/>
						</div>
					</div>
				</div>
				{Object.values(employees)
					.sort(sortFunc)
					.filter(filterFunc)
					.map(employee => (
						<div className="row card" key={employee.id}>
							<Link
								to={{
									pathname: `/employees/edit/${employee.id}`
								}}
							>
								<div className="name table">
									{employee.name}
								</div>
								<div className="role table">
									{returnDefaultValue(employee.role).label}
								</div>
								<div className="phone table">
									{employee.phone}
								</div>
								<div className="age table">
									{employee.birthday}
								</div>
							</Link>
						</div>
					))}
			</div>
		</section>
	);
};

export default Employees;
