'use client';

import { useAppSelector } from '@/lib/hooks';
import { selectUser } from '@/features/auth/authSlice';
import { cn } from '@/lib/utils';

import Cards from './cards';
import Chart from './chart';
import Organizers from './organizers';
import Events from './events';

const Dashboard = () => {
	const user = useAppSelector(selectUser);
	return (
		<div className='p-4'>
			<Cards />
			<Chart />
			<div
				className={cn(
					'mt-4',
					user?.userType?.includes('admin') && 'grid md:grid-cols-2 gap-4'
				)}>
				<Events />
				{user?.userType?.includes('admin') && <Organizers />}
			</div>
		</div>
	);
};

export default Dashboard;
