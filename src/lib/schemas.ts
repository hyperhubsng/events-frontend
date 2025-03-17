import { z } from 'zod';

const message = 'This field is required';

export const CreateEventSchema = z.object({
	event_name: z.string().min(2, {
		message,
	}),
	start_date: z.date({
		required_error: message,
	}),
	start_time: z.string().min(2, {
		message,
	}),
	event_address: z.string().min(2, {
		message,
	}),
	landmark: z.string().min(2, {
		message,
	}),
	event_type: z.string().min(2, {
		message,
	}),
	organization: z.string().min(2, {
		message,
	}),
	about: z.string().min(20, {
		message: 'Field must be 20 characters long',
	}),
	thumbnail: z.instanceof(File, {
		message: 'Please select an image',
	}),
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
