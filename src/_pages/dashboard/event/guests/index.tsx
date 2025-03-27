'use client';

import BreadcrumbWrapper from '@/components/breadcrumb';

const Guests = () => {
	return (
		<BreadcrumbWrapper items={['Events', 'Guest Check-in']}>
			<div>Guests</div>
		</BreadcrumbWrapper>
	);
};

export default Guests;
