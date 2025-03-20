import { apiSlice } from '../api/apiSlice';
import { EventsData, EventsParams } from './types';

export const eventsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getEvents: builder.query<EventsData, EventsParams>({
			query: (params) => ({
				url: '/events',
				params,
			}),
			providesTags: ['events'],
		}),
	}),
});

export const { useGetEventsQuery } = eventsApiSlice;
