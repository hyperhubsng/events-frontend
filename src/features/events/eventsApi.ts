import { apiSlice } from '../api/apiSlice';
import { Event, EventGuestsData, EventsData, EventsParams } from './types';

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
		getEventGuests: builder.query<EventGuestsData, { ticket: string; id: string }>({
			query: (params) => ({
				url: `/events/${params.id}/guests`,
				params,
			}),
			providesTags: ['events'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetEventsQuery,
	useCreateEventMutation,
	useGetEventQuery,
	useGetEventGuestsQuery,
} = eventsApiSlice;
