import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	page: 1,
	users: [],
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addUsers(state, action) {
			state.users.push(...action.payload);
		},
		nextPage(state) {
			state.page = state.page + 1;
		},
		resetUsers: () => initialState,
	},
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
