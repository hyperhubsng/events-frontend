import Payouts from '@/_pages/dashboard/payouts';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Payouts',
};

const Payoutspage = () => {
	return <Payouts />;
};

export default Payoutspage;
