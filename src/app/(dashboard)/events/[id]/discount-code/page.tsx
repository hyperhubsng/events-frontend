import DiscountCode from '@/_pages/dashboard/event/discount-code';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Discount Code',
};

const DiscountCodepage = () => {
	return <DiscountCode />;
};

export default DiscountCodepage;
