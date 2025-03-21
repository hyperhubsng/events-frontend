import { apiSlice } from '../api/apiSlice';
import { UsersData, UsersParams } from './types';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<UsersData, UsersParams>({
			query: (params) => ({
				url: '/users',
				params,
			}),
		}),
	}),
});

export const { useGetUsersQuery } = usersApiSlice;
