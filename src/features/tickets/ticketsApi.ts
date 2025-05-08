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
		updateTicket: builder.mutation({
			query: (body: CreateTicketPayload) => ({
				url: `/events/tickets/${body.id}`,
				method: 'PUT',
				body,
			}),
			invalidatesTags: ['tickets'],
		}),
		deleteTicket: builder.mutation({
			query: (id: string) => ({
				url: `/tickets/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['tickets'],
		}),
	}),
	overrideExisting: true,
});

export const {
	useGetEventTicketsQuery,
	useCreateTicketMutation,
	useUpdateTicketMutation,
	useDeleteTicketMutation,
} = ticketsApiSlice;
