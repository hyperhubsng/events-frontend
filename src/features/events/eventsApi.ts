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
		createEvent: builder.mutation({
			query: (body: FormData) => ({
				url: '/events',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['events'],
		}),
	}),
	overrideExisting: true,
});

export const { useGetEventsQuery, useCreateEventMutation } = eventsApiSlice;
