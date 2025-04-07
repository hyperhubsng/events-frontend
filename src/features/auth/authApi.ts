/* eslint-disable @typescript-eslint/no-explicit-any */
import { setUserToken } from '@/lib/session';
import { apiSlice } from '../api/apiSlice';
import { OnboardOrganizerPayload } from './types';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body: { email: string; password: string }) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
			async onQueryStarted(arg, { queryFulfilled }) {
				try {
					const { data: response } = await queryFulfilled;

					await setUserToken('access-token', response?.data?.token);
					window.location.reload();
				} catch (error: any) {
					console.log(error);
				}
			},
		}),
		onboardOrganizer: builder.mutation({
			query: (body: OnboardOrganizerPayload) => ({
				url: '/auth/onboard-organiser',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['users'],
		}),
	}),
	overrideExisting: true,
});

export const { useLoginMutation, useOnboardOrganizerMutation } = authApiSlice;
