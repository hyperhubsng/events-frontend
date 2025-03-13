'use client';

import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';

import * as RechartsPrimitive from 'recharts';

const chartConfig = {
	events: {
		label: 'Events',
		color: 'var(--blue-50)',
	},
} satisfies ChartConfig;

const Events = () => {
	const [time, setTime] = useState('This Year');
	const times = ['This Year', 'Last Year', 'Two Years ago'];

	const chartData = [
		{ month: 'Jan 2025', events: 8 },
		{ month: 'Feb 2025', events: 18 },
		{ month: 'Mar 2025', events: 10 },
		{ month: 'Apr 2025', events: 0 },
		// { month: 'May 2025', events: 30 },
		// { month: 'Jun 2025', events: 48 },
		// { month: 'Jul 2025', events: 55 },
		// { month: 'Aug 2025', events: 20 },
	];

	return (
		<div className='bg-white rounded-[4px] md:rounded-[8px] p-4 md:p-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-black-950 text-sm md:text-base lg:text-2xl font-semibold'>
					Events
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

			<div className='mt-8 -ml-10'>
				<ChartContainer config={chartConfig} className='w-full'>
					<BarChart accessibilityLayer data={chartData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip content={<CustomTooltip />} />
						<YAxis />
						<Bar dataKey='events' stackId='a' fill='var(--color-events)' />
					</BarChart>
				</ChartContainer>
			</div>
		</div>
	);
};

export default Events;

const CustomTooltip = ({
	active,
	payload,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) => {
	if (active && payload && payload.length) {
		const item = payload[0].payload as { events: number; month: string };

		return (
			<div className='bg-white rounded-[4px] border border-solid border-white-200 text-center py-1 px-2'>
				<p className='text-black-950 text-xs'>{item.month}</p>
				<p className='text-black-950 text-sm font-bold pt-2'>
					{item.events.toLocaleString()} Events
				</p>
			</div>
		);
	}
};
