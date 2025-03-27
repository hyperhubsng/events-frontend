'use client';

import { useParams } from 'next/navigation';
import { useGetEventGuestsQuery } from '@/features/events/eventsApi';

import BreadcrumbWrapper from '@/components/breadcrumb';
import Pulse from '@/components/pulse';
import GuestTable from './guest-table';

const Guests = () => {
	const params = useParams();

	const { data: guestOverview, isLoading } = useGetEventGuestsQuery({
		id: params.id!,
		ticket: 'all',
	});

	return (
		<BreadcrumbWrapper items={['Events', 'Guest Check-in']}>
			<div className='h-[90%] p-4'>
				{isLoading ? <Pulse /> : <GuestTable guests={guestOverview!} />}
			</div>
		</BreadcrumbWrapper>
	);
};

export default Guests;
