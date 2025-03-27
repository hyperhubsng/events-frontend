'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetEventGuestsQuery } from '@/features/events/eventsApi';

import BreadcrumbWrapper from '@/components/breadcrumb';
import Pulse from '@/components/pulse';
import Cards from './cards';
import GuestTable from './guest-table';

const Guests = () => {
	const [limit, setLimit] = useState('10');

	const params = useParams();
	const searchParams = useSearchParams();

	const { data: guestOverview, isLoading } = useGetEventGuestsQuery({
		id: params.id!,
		ticket: 'all',
		page: +searchParams.get('page')! || 1,
		limit: +limit,
	});

	return (
		<BreadcrumbWrapper items={['Events', 'Guest Check-in']}>
			<div className='h-[90%] p-4'>
				{isLoading ? (
					<Pulse />
				) : (
					<>
						<Cards guestOverview={guestOverview!} />
						<GuestTable guests={guestOverview!} limit={limit} setLimit={setLimit} />
					</>
				)}
			</div>
		</BreadcrumbWrapper>
	);
};

export default Guests;
