import {
	ADD_NOTIFICATION,
	REMOVE_NOTIFICATION
} from "../constants/actionNotification";

export const addNotification = message => ({
	type: ADD_NOTIFICATION,
	message
});

export const removeNotification = () => ({
	type: REMOVE_NOTIFICATION
});
