import Settings from '@/_pages/dashboard/settings';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Settings',
};

const Settingspage = () => {
	return <Settings />;
};

export default Settingspage;
