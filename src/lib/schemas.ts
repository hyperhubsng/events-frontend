import { z } from 'zod';

const message = 'This field is required';

export const CreateEventSchema = z.object({
	title: z.string().min(2, {
		message,
	}),
	startDate: z.date({
		required_error: message,
	}),
	start_time: z.string().min(2, {
		message,
	}),
	venue: z.string().min(2, {
		message,
	}),
	coordinates: z.string().optional(),
	eventType: z.string().min(2, {
		message,
	}),
	ownerId: z.string().min(2, {
		message,
	}),
	description: z.string().min(20, {
		message: 'Field must be 20 characters long',
	}),
	// thumbnail: z.instanceof(File, {
	// 	message: 'Please select an image',
	// }),
	event_img_1: z.instanceof(File, {
		message: 'Please select an image',
	}),
	event_img_2: z.instanceof(File, {
		message: 'Please select an image',
	}),
	event_img_3: z.instanceof(File, {
		message: 'Please select an image',
	}),
});
