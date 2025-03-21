import { createSlice } from '@reduxjs/toolkit';
import { Event } from './types';
import { toast } from 'sonner';

interface EventsState {
	events: Event[];
}

const initialState: EventsState = {
	events: [],
};

export const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		addEventToDraft: (state, action) => {
			const findEvent = state.events.find(
				(event) => event._id === action.payload._id
			);

			if (!findEvent) {
				state.events = [...state.events, action.payload];
				toast.success('Event has been added to draft');
				setTimeout(() => {
					window.location.replace('/events');
				}, 1000);
			} else {
				toast.warning('Event is already in draft');
			}
		},
	},
	selectors: {
		selectEvents: (selectEvents) => selectEvents?.events,
	},
});

export const { addEventToDraft } = eventsSlice.actions;

export const { selectEvents } = eventsSlice.selectors;

export const eventsReducer = eventsSlice.reducer;
