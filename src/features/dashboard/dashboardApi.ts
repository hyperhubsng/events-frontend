import { apiSlice } from '../api/apiSlice';
import { DashboardAnalyticsData } from './types';

const dashboardApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAnalytics: builder.query<DashboardAnalyticsData, void>({
			query: () => '/analytics',
		}),
	}),
	overrideExisting: true,
});

export const { useGetAnalyticsQuery } = dashboardApiSlice;
