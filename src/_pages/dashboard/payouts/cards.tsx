import { icons } from '@/components/icons';

import InfoCard from '@/components/info-card';

const Cards = () => {
	const card_info = [
		{
			icon: icons.TRev,
			title: 'Total Revenue',
			info: 'N 5,000,000',
		},
		{
			icon: icons.TPayouts,
			title: 'Total Payouts',
			info: 'N 0',
		},
		{
			icon: icons.PPayouts,
			title: 'Pending Payouts',
			info: 'N 0',
		},
		{
			icon: icons.BInfo,
			title: 'Bank information',
			info: 'Nil',
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
