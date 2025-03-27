import Sales from '@/_pages/dashboard/event/sales';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sales Overview',
};

const Salespage = () => {
	return <Sales />;
};

export default Salespage;
