import { createSlice } from '@reduxjs/toolkit';
import { Event } from './types';
import { toast } from 'sonner';

interface EventsState {
	events: Event[];
	previewEvent: PreviewEvent | null;
}

interface PreviewEvent {
	title: string;
	startDate: Date | undefined;
	start_time: string;
	venue: string;
	coordinates: string;
	eventType: string;
	ownerId: string;
	description: string;
	thumbnail: File | undefined;
	event_img_1: File | undefined;
	event_img_2: File | undefined;
	event_img_3: File | undefined;
}

const initialState: EventsState = {
	events: [],
	previewEvent: null,
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
		setPreviewEvent: (state, action) => {
			state.previewEvent = action.payload;
		},
	},
	selectors: {
		selectEvents: (selectEvents) => selectEvents?.events,
		selectPreviewEvent: (selectEvents) => selectEvents.previewEvent,
	},
});

export const { addEventToDraft, setPreviewEvent } = eventsSlice.actions;

export const { selectEvents, selectPreviewEvent } = eventsSlice.selectors;

export const eventsReducer = eventsSlice.reducer;
