import Cards from './cards';
import PayoutHistory from './payout-history';

const Payouts = () => {
	return (
		<div className='p-4 flex flex-col h-full'>
			<Cards />
			<PayoutHistory />
		</div>
	);
};

export default Payouts;
