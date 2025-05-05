import { createSlice } from '@reduxjs/toolkit';
import { Role } from './types';

interface RolesState {
	editingRole: Role | null;
}

const initialState: RolesState = {
	editingRole: null,
};

export const rolesSlice = createSlice({
	name: 'roles',
	initialState,
	reducers: {
		setEdittingRole: (state, action) => {
			state.editingRole = action.payload;
		},
	},
	selectors: {
		selectEdittingRole: (roles) => roles.editingRole,
	},
});

export const { setEdittingRole } = rolesSlice.actions;

export const { selectEdittingRole } = rolesSlice.selectors;

export const rolesReducer = rolesSlice.reducer;
