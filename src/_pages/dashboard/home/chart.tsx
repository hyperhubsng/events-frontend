'use client';

import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

import Tabs from '@/components/tabs';

const Chart = () => {
	const [selected, setSelected] = useState('Revenue');
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2025, 2, 1),
		to: new Date(2025, 2, 7),
	});

	const [time, setTime] = useState('This Week');
	const times = ['This Week', 'Last Week', 'Two weeks ago'];

	return (
		<div className='bg-white rounded-[4px] md:rounded-[8px] pt-5 px-6 pb-6 mt-4'>
			<div className='flex items-center justify-between'>
				<Tabs
					selected={selected}
					setSelected={setSelected}
					items={['Revenue', 'Commission']}
				/>

				<div className='flex items-center gap-4'>
					<Popover>
						<PopoverTrigger asChild>
							<button className='flex items-center justify-center gap-4 border border-white-300 border-solid rounded-[4px] px-3 h-8'>
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, 'dd LLL, y')} -{' '}
											{format(date.to, 'dd LLL, y')}
										</>
									) : (
										format(date.from, 'dd LLL, y')
									)
								) : (
									<span>Pick a date</span>
								)}

								<ChevronDown color='#808080' size={16} />
							</button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0 ' align='start'>
							<Calendar
								initialFocus
								mode='range'
								defaultMonth={date?.from}
								selected={date}
								onSelect={setDate}
								numberOfMonths={2}
							/>
						</PopoverContent>
					</Popover>

					<Select defaultValue={time} onValueChange={(e) => setTime(e)}>
						<SelectTrigger
							className='focus-visible:ring-0 focus-visible:outline-none 
             shadow-none h-8 border-white-300 focus-visible:border-white-300 select-chevron'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent className='w-full'>
							{times.map((time) => (
								<SelectItem
									key={time}
									value={time}
									className='w-full cursor-pointer'>
									{time}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default Chart;
