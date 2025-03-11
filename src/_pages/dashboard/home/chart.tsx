'use client';

import Tabs from '@/components/tabs';
import { useState } from 'react';

const Chart = () => {
	const [selected, setSelected] = useState('Revenue');

	return (
		<div className='bg-white rounded-[4px] md:rounded-[8px] pt-5 px-6 pb-6 mt-4'>
			<div className='flex items-center justify-between'>
				<Tabs
					selected={selected}
					setSelected={setSelected}
					items={['Revenue', 'Commission']}
				/>
			</div>
		</div>
	);
};

export default Chart;
