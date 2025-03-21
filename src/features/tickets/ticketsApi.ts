import { apiSlice } from '../api/apiSlice';
import { CreateTicketPayload, TicketsData } from './types';

const ticketsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getEventTickets: builder.query<TicketsData, string>({
			query: (eventId: string) => `/events/${eventId}/tickets`,
			providesTags: ['tickets'],
		}),
		createTicket: builder.mutation({
			query: (body: CreateTicketPayload) => ({
				url: `/events/${body.eventId}/tickets`,
				method: 'POST',
				body,
			}),
			invalidatesTags: ['tickets'],
		}),
	}),
	overrideExisting: true,
});

export const { useGetEventTicketsQuery, useCreateTicketMutation } = ticketsApiSlice;
