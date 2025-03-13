'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const Organizers = () => {
	const [time, setTime] = useState('This Year');
	const times = ['This Year', 'Last Year', 'Two Years ago'];

	return (
		<div className='bg-white rounded-[4px] md:rounded-[8px] p-4 md:p-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-black-950 text-sm md:text-base lg:text-2xl font-semibold'>
					Organizers
				</h2>

				<Select defaultValue={time} onValueChange={(e) => setTime(e)}>
					<SelectTrigger
						className='focus-visible:ring-0 focus-visible:outline-none text-sm text-black-950
             shadow-none h-8 border-white-300 focus-visible:border-white-300 select-chevron '>
						<SelectValue />
					</SelectTrigger>
					<SelectContent className='w-full'>
						{times.map((time) => (
							<SelectItem key={time} value={time} className='w-full cursor-pointer'>
								{time}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default Organizers;
