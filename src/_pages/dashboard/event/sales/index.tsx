'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetEventSalesQuery } from '@/features/events/eventsApi';

import BreadcrumbWrapper from '@/components/breadcrumb';
import Cards from './cards';
import SalesTable from './sales-table';
import Pulse from '@/components/pulse';

const Sales = () => {
	const [limit, setLimit] = useState('10');

	const params = useParams();
	const searchParams = useSearchParams();

	const { data: salesOverview, isLoading } = useGetEventSalesQuery({
		id: params.id!,
		ticket: 'all',
		page: +searchParams.get('page')! || 1,
		limit: +limit,
	});

	return (
		<BreadcrumbWrapper items={['Events', 'Sales']}>
			<div className='h-[90%] p-4'>
				{isLoading ? (
					<Pulse />
				) : (
					<>
						<Cards salesOverview={salesOverview!} />
						<SalesTable
							limit={limit}
							setLimit={setLimit}
							salesOverview={salesOverview!}
						/>
					</>
				)}
			</div>
		</BreadcrumbWrapper>
	);
};

export default Sales;
