import BreadcrumbWrapper from '@/components/breadcrumb';
import React from 'react';

const Sales = () => {
	return (
		<BreadcrumbWrapper items={['Events', 'Sales']}>
			<div>Sales</div>
		</BreadcrumbWrapper>
	);
};

export default Sales;
