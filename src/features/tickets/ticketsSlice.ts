import { createSlice } from '@reduxjs/toolkit';

interface TicketCategory {
	name: string;
	quantity: string;
	limit: string;
	id: string;
	price: string;
}

interface TicketsState {
	ticketCategories: TicketCategory[];
}

const initialState: TicketsState = {
	ticketCategories: [],
};

export const ticketsSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {
		setTicketCategories: (state, action) => {
			state.ticketCategories = [...state.ticketCategories, action.payload];
		},
		editTicketCategory: (state, action) => {
			state.ticketCategories = state.ticketCategories.map((ticket) =>
				ticket.id === action.payload.id ? { ...ticket, ...action.payload } : ticket
			);
		},
		deleteTicketCategory: (state, action) => {
			state.ticketCategories = state.ticketCategories.filter(
				(ticket) => ticket.id !== action.payload
			);
		},
	},
	selectors: {
		selectTicketCategories: (tickets) => tickets.ticketCategories,
	},
});

export const { setTicketCategories, editTicketCategory, deleteTicketCategory } =
	ticketsSlice.actions;

export const { selectTicketCategories } = ticketsSlice.selectors;

export const ticketsReducer = ticketsSlice.reducer;
