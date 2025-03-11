import Events from '@/_pages/dashboard/events';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Events',
};

const Eventspage = () => {
	return <Events />;
};

export default Eventspage;
