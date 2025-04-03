/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/lib/constants';
import { deleteUserToken, getUserToken } from '@/lib/session';
import { logOut } from '../auth/authSlice';
import { toast } from 'sonner';

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	async prepareHeaders(headers, { ...rest }) {
		const token = await getUserToken('access-token');

		if (typeof rest?.arg === 'object' && !(rest?.arg?.body instanceof FormData)) {
			headers.set('Content-Type', 'application/json');
			headers.set('Accept', 'application/json');
		}

		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result: any = await baseQuery(args, api, extraOptions);

	if (
		(result?.error &&
			result?.error?.data?.message ===
				'Unauthorized, provide authorization token') ||
		result?.error?.data?.message === 'Please,login again'
	) {
		deleteUserToken('access-token');
		toast.info('Your session has expired, please log in again.');
		setTimeout(() => {
			api.dispatch(logOut());
		}, 800);
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({}),
	tagTypes: ['events', 'tickets', 'users'],
});
