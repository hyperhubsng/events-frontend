'use client';

import { useGetAnalyticsQuery } from '@/features/dashboard/dashboardApi';
import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/features/auth/authSlice';
import { Skeleton } from '@/components/ui/skeleton';
import { icons } from '@/components/icons';

import InfoCard from '@/components/info-card';

const Cards = () => {
	const { data: analytics, isLoading } = useGetAnalyticsQuery();

	const user = useAppSelector(selectUser);

	const card_info = [
		{
			icon: icons.TRev,
			title: 'Total Revenue',
			info: analytics && analytics?.data?.platform?.totalRevenue,
		},
		{
			icon: icons.TRev,
			title: 'Total Commission',
			info: analytics && analytics?.data?.platform?.totalCommissions,
		},
		{
			icon: icons.TEvents,
			title: 'Total Events',
			info: analytics && analytics?.data?.platform?.totalEvents,
		},
		{
			icon: icons.TOrgs,
			title: 'Total Organizers',
			info: analytics && analytics?.data?.platform?.totalUsers,
		},
	];

	return (
		<div
			className={`grid grid-cols-2 gap-4 ${
				user?.userType?.includes('admin') ? 'min-[1200px]:grid-cols-4' : ''
			}`}>
			{isLoading ? (
				Array(4)
					.fill({})
					.map((_, i) => (
						<Skeleton
							className='h-[53px] rounded-[4px] md:h-[93px] md:rounded-[8px]'
							key={i}
						/>
					))
			) : (
				<>
					{user?.userType?.includes('admin') ? (
						card_info.map((card) => <InfoCard key={card.title} {...card} />)
					) : (
						<>
							<InfoCard {...card_info[0]} />
							<InfoCard {...card_info[2]} />
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Cards;
