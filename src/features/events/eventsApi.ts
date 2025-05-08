/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from '../api/apiSlice';
import {
	Event,
	EventGuestsData,
	EventSalesData,
	EventsData,
	EventsParams,
} from './types';

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
		updateEvent: builder.mutation<
			any,
			{ id: string | string[]; formData: FormData }
		>({
			query: ({ id, formData }) => ({
				url: `/events/${id}`,
				method: 'PUT',
				body: formData,
			}),
			invalidatesTags: ['events'],
		}),
		deleteEvent: builder.mutation({
			query: (id: string) => ({
				url: `/events/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['events'],
		}),
		removeEventImage: builder.mutation({
			query: (body: { id: string; images: string[] }) => ({
				url: `/events/${body.id}/images`,
				method: 'DELETE',
				body,
			}),
			invalidatesTags: ['events'],
		}),
		getEvent: builder.query<{ data: Event }, string>({
			query: (eventId: string) => `/events/${eventId}`,
		}),
		getEventGuests: builder.query<
			EventGuestsData,
			{ ticket: string; id: string | string[] } & PaginationParams
		>({
			query: (params) => ({
				url: `/events/${params.id}/guests`,
				params,
			}),
			providesTags: ['events'],
		}),
		getEventSales: builder.query<
			EventSalesData,
			{ ticket: string; id: string | string[] } & PaginationParams
		>({
			query: (params) => ({
				url: `/events/${params.id}/sales-report`,
				params,
			}),
			providesTags: ['events'],
		}),
		checkInGuest: builder.query({
			query: (params: { action: string; actionType: string; code: string }) => ({
				url: `/attendees/${params.code}`,
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
	useUpdateEventMutation,
	useDeleteEventMutation,
	useRemoveEventImageMutation,
	useGetEventQuery,
	useGetEventGuestsQuery,
	useGetEventSalesQuery,
	useLazyCheckInGuestQuery,
} = eventsApiSlice;
