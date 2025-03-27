import { icons } from '@/components/icons';
import { EventGuestsData } from '@/features/events/types';

import InfoCard from '@/components/info-card';

const Cards = ({ guestOverview }: { guestOverview: EventGuestsData }) => {
	const card_info = [
		{
			icon: icons.TRev,
			title: 'Total Tickets',
			info: guestOverview?.data?.stats?.totalTickets,
		},
		{
			icon: icons.TRev,
			title: 'Total Check-In',
			info: guestOverview?.data?.stats?.totalCheckin,
		},
	];
	return (
		<div className='grid grid-cols-2 min-[1200px]:grid-cols-4 gap-4 mb-4'>
			{card_info.map((card) => (
				<InfoCard key={card.title} {...card} />
			))}
		</div>
	);
};

export default Cards;
