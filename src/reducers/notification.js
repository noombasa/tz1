import {
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION
} from "../constants/actionNotification";

const initialState = {
	message: ""
};

export const notification = (state = initialState, action) => {
	switch (action.type) {
		case ADD_NOTIFICATION: {
			return {
				message: action.message
			};
		}
		case REMOVE_NOTIFICATION: {
			return {
				message: ""
			};
		}
		default: {
			return state;
		}
	}
};
