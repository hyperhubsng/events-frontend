import Guests from '@/_pages/dashboard/event/guests';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Guests',
};

const Guestspage = () => {
	return <Guests />;
};

export default Guestspage;
