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
	previewEvent: null;
}

const initialState: TicketsState = {
	ticketCategories: [],
	previewEvent: null,
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
		setPreviewEvent: (state, action) => {
			state.previewEvent = action.payload;
		},
	},
	selectors: {
		selectTicketCategories: (tickets) => tickets.ticketCategories,
		selectPreviewEvent: (tickets) => tickets.previewEvent,
	},
});

export const {
	setTicketCategories,
	editTicketCategory,
	deleteTicketCategory,
	setPreviewEvent,
} = ticketsSlice.actions;

export const { selectTicketCategories, selectPreviewEvent } = ticketsSlice.selectors;

export const ticketsReducer = ticketsSlice.reducer;
