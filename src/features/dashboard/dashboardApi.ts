/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateRange } from 'react-day-picker';
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
				from?: string | DateRange | undefined;
				to?: string | DateRange | undefined;
			}
		>({
			query: (params) => ({
				url: '/analytics/payments',
				params,
			}),
		}),
	}),
	overrideExisting: true,
});

export const { useGetAnalyticsQuery, useGetRevenueAnalyticsQuery } =
	dashboardApiSlice;
