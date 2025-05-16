/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

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
	resetToken: string;
}

const initialState: AuthState = {
	user: null,
	resetToken: '',
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
		setResetToken: (state, action) => {
			state.resetToken = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(REHYDRATE as any, (state, action: PayloadAction<any>) => {
			const rehydratedState = action.payload?.auth;
			if (!rehydratedState) return state;

			return {
				...initialState,
				...rehydratedState,
			};
		});
	},
	selectors: {
		selectUser: (auth) => auth.user,
		selectResetToken: (auth) => auth.resetToken,
	},
});

export const { setUser, logOut, setResetToken } = authSlice.actions;

export const { selectUser, selectResetToken } = authSlice.selectors;

export const authReducer = authSlice.reducer;
