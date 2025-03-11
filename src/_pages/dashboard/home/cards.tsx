import { icons } from '@/components/icons';
import InfoCard from '@/components/info-card';

const Cards = () => {
	const card_info = [
		{
			icon: icons.TRev,
			title: 'Total Revenue',
			info: 'N50,0000',
		},
		{
			icon: icons.TRev,
			title: 'Total Commission',
			info: '40',
		},
		{
			icon: icons.TEvents,
			title: 'Total Events',
			info: '50',
		},
		{
			icon: icons.TOrgs,
			title: 'Total Organizers',
			info: '10',
		},
	];

	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
			{card_info.map((card) => (
				<InfoCard key={card.title} {...card} />
			))}
		</div>
	);
};

export default Cards;
