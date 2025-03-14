import CreateEvent from '@/_pages/dashboard/events/create-event';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Event',
};

const CreateEventpage = () => {
	return <CreateEvent />;
};

export default CreateEventpage;
