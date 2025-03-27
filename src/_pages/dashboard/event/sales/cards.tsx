import { icons } from '@/components/icons';
import { EventSalesData } from '@/features/events/types';

import InfoCard from '@/components/info-card';

const Cards = ({ salesOverview }: { salesOverview: EventSalesData }) => {
	const card_info = [
		{
			icon: icons.TRev,
			title: 'Ticket Category',
			info: salesOverview?.data?.stats?.category,
		},
		{
			icon: icons.TRev,
			title: 'Tickets Sold',
			info: salesOverview?.data?.stats?.ticketSold,
		},
		{
			icon: icons.SRev,
			title: 'Sales Revenue',
			info: `N${salesOverview?.data?.stats?.totalSales?.toLocaleString()}`,
		},
		{
			icon: icons.SRev,
			title: 'Amount received',
			info: `N${salesOverview?.data?.stats?.totalReceived?.toLocaleString()}`,
		},
	];
	return (
		<div className='grid grid-cols-2 min-[1200px]:grid-cols-4 gap-4'>
			{card_info.map((card) => (
				<InfoCard key={card.title} {...card} />
			))}
		</div>
	);
};

export default Cards;
