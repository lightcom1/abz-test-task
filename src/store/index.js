import { configureStore } from '@reduxjs/toolkit';
import { abzApi } from './abz/abz.api.js';
import { usersReducer } from './abz/users.slice';

export const store = configureStore({
	reducer: {
		[abzApi.reducerPath]: abzApi.reducer,
		users: usersReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(abzApi.middleware),
});

