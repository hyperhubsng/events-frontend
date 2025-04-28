/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../api/apiSlice';
import { DashboardAnalyticsData } from './types';

const dashboardApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAnalytics: builder.query<DashboardAnalyticsData, void>({
			query: () => '/analytics',
		}),
		getRevenueAnalytics: builder.query<
			any,
			{
				presentation: string;
				from?: string | undefined;
				to?: string | undefined;
			}
		>({
			query: (params) => ({
				url: '/analytics/payments',
				params,
			}),
		}),
		getEventsAnalytics: builder.query<
			any,
			{
				presentation: string;
			}
		>({
			query: (params) => ({
				url: '/events/payments',
				params,
			}),
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetAnalyticsQuery,
	useGetRevenueAnalyticsQuery,
	useGetEventsAnalyticsQuery,
} = dashboardApiSlice;
