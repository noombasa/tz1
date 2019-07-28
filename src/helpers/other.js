export const parseDate = str => {
	const dataArray = str.split(".");
	return Date.parse(`${dataArray[2]}-${dataArray[1]}-${dataArray[0]}`);
};

export const returnDefaultValue = role => {
	switch (role) {
		case "driver": {
			return { value: "driver", label: "Водитель" };
		}
		case "waiter": {
			return { value: "waiter", label: "Официант" };
		}
		case "cook": {
			return { value: "cook", label: "Повар" };
		}
		default: {
			return { value: "driver", label: "Водитель" };
		}
	}
};

export const verification = ({ name, role, birthday, phone, isArchive }) => {
	if (!!name) {
		let nameArray = name
			.replace(/(^\s+|\s+$)/g, "")
			.replace(/\s+/g, " ")
			.split(" ");
		if (nameArray.length !== 2) {
			return {
				error: true,
				errorMsg:
					'В поле "Имя" должны быть указаны только имя и фамилия',
				type: "name"
			};
		}
		if (
			!(
				/^[а-яА-Я]*$/.test(nameArray[0]) &&
				/^[а-яА-Я]*$/.test(nameArray[1])
			)
		) {
			return {
				error: true,
				errorMsg: "Используйте только русские буквы для ввода",
				type: "name"
			};
		}
	} else {
		return {
			error: true,
			errorMsg: 'Не заполнено поле "Имя"',
			type: "name"
		};
	}

	if (!role) {
		return {
			error: true,
			errorMsg: "Не выбрана профессия",
			type: "role"
		};
	}

	if (!!birthday) {
		let birthdayArray = birthday.split(".");
		const nowYear = new Date().getFullYear();
		if (birthday.includes("_")) {
			return {
				error: true,
				errorMsg: "Заполните дату полностью",
				type: "birthday"
			};
		}
		if (
			+birthdayArray[0] < 1 ||
			+birthdayArray[0] > 31 ||
			+birthdayArray[1] < 1 ||
			+birthdayArray[1] > 12 ||
			+birthdayArray[2] < 1900 ||
			+birthdayArray[2] > nowYear
		) {
			return {
				error: true,
				errorMsg: "Не корректная дата",
				type: "birthday"
			};
		}
	} else {
		return {
			error: true,
			errorMsg: 'Не заполнено поле "Дата рождения"',
			type: "birthday"
		};
	}

	if (!!phone) {
		if (phone.includes("_")) {
			return {
				error: true,
				errorMsg: "Введите номер полностью",
				type: "phone"
			};
		}
	} else {
		return {
			error: true,
			errorMsg: 'Не заполнено поле "Телефонный номер"',
			type: "phone"
		};
	}

	return {
		error: false,
		errorMsg: "",
		type: ""
	};
};
