import { apiSlice } from '../api/apiSlice';
import { UsersData, UsersParams } from './types';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<UsersData, UsersParams & PaginationParams>({
			query: (params) => ({
				url: '/users',
				params,
			}),
			providesTags: ['users'],
		}),
	}),
});

export const { useGetUsersQuery } = usersApiSlice;
