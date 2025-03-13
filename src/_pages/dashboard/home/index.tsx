'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import Cards from './cards';
import Chart from './chart';
import Organizers from './organizers';
import Events from './events';

const Dashboard = () => {
	const {} = useSidebar();

	return (
		<div>
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
