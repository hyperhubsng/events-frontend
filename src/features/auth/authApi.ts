import { apiSlice } from '../api/apiSlice';
import { OnboardAdminPayload, OnboardOrganizerPayload } from './types';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body: { email: string; password: string }) => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
		}),
		forgotPassword: builder.mutation({
			query: (body: { email: string }) => ({
				url: '/auth/forgot-password',
				method: 'POST',
				body,
			}),
		}),
		verifyForgotPassword: builder.mutation({
			query: (body: { otpEmail: string; otp: string }) => ({
				url: '/auth/verify-forgot-password',
				method: 'POST',
				body,
			}),
		}),
		resetPassword: builder.mutation({
			query: (body: {
				resetToken: string;
				password: string;
				confirmPassword: string;
			}) => ({
				url: '/auth/set-password',
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
		onboardAdmin: builder.mutation({
			query: (body: OnboardAdminPayload) => ({
				url: '/auth/onboard-secondary-users',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['users'],
		}),
		editAdmin: builder.mutation({
			query: (body: OnboardAdminPayload) => ({
				url: `/users/${body._id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['users'],
		}),
		editOrganizer: builder.mutation({
			query: (body: OnboardOrganizerPayload) => ({
				url: `/users/${body._id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['users'],
		}),
		deactivateOrganizer: builder.mutation({
			query: (id: string) => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['users'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useLoginMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useVerifyForgotPasswordMutation,
	useOnboardOrganizerMutation,
	useEditOrganizerMutation,
	useOnboardAdminMutation,
	useEditAdminMutation,
	useDeactivateOrganizerMutation,
} = authApiSlice;
