import OrganizerMgt from '@/_pages/dashboard/organizer-mgt';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Organizer Management',
};

const OrganizerMgtpage = () => {
	return <OrganizerMgt />;
};

export default OrganizerMgtpage;
