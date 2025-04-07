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
