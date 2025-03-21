import { apiSlice } from '../api/apiSlice';
import { Event, EventsData, EventsParams } from './types';

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
		getEvent: builder.query<{ data: Event }, string>({
			query: (eventId: string) => `/events/${eventId}`,
		}),
	}),
	overrideExisting: true,
});

export const { useGetEventsQuery, useCreateEventMutation, useGetEventQuery } =
	eventsApiSlice;
