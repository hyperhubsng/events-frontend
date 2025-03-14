'use client';

import { cn } from '@/lib/utils';

import Cards from './cards';
import Chart from './chart';
import Organizers from './organizers';
import Events from './events';

const Dashboard = () => {
	return (
		<div className='p-4'>
			<Cards />
			<Chart />
			<div className={cn('grid md:grid-cols-2 mt-4 gap-4')}>
				<Events />
				<Organizers />
			</div>
		</div>
	);
};

export default Dashboard;
