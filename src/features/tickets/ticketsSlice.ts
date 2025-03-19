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
	previewEvent: PreviewEvent | null;
}

interface PreviewEvent {
	event_name: string;
	start_date: Date | undefined;
	start_time: string;
	event_address: string;
	landmark: string;
	event_type: string;
	organization: string;
	about: string;
	thumbnail: File | undefined;
	event_img_1: File | undefined;
	event_img_2: File | undefined;
	event_img_3: File | undefined;
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
