import CreateEvent from '@/_pages/dashboard/events/create-event';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Edit Event',
};

const EditEventpage = () => {
	return <CreateEvent edit />;
};

export default EditEventpage;
