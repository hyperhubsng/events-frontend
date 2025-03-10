import { createSlice } from '@reduxjs/toolkit';

interface User {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	profileImageUrl: string;
	userType: string;
}

interface AuthState {
	user: User | null;
}

const initialState: AuthState = {
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		logOut: (state) => {
			state.user = null;
			window.location.replace('/login');
		},
	},
	selectors: {
		selectUser: (auth) => auth.user,
	},
});

export const { setUser, logOut } = authSlice.actions;

export const { selectUser } = authSlice.selectors;

export const authReducer = authSlice.reducer;
