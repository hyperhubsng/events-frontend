'use client';

import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

import * as RechartsPrimitive from 'recharts';

import Tabs from '@/components/tabs';

const chartConfig = {
	total_revenue: {
		label: 'Total Revenue',
		color: 'var(--blue-50)',
	},
	sales: {
		label: 'Sales',
	},
} satisfies ChartConfig;

const Chart = () => {
	const [selected, setSelected] = useState('Revenue');
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2025, 2, 1),
		to: new Date(2025, 2, 7),
	});

	const [time, setTime] = useState('This Week');
	const times = ['This Week', 'Last Week', 'Two weeks ago'];

	const chartData = [
		{ day: 'Mar 01, 2025 04:00PM', total_revenue: 5, sales: 150000 },
		{ day: 'Mar 02, 2025 04:00PM', total_revenue: 5, sales: 200000 },
		{ day: 'Mar 03, 2025 04:00PM', total_revenue: 30, sales: 80000 },
		{ day: 'Mar 04, 2025 04:00PM', total_revenue: 40, sales: 900000 },
		{ day: 'Mar 05, 2025 04:00PM', total_revenue: 0, sales: 250000 },
		{ day: 'Mar 06, 2025 04:00PM', total_revenue: 48, sales: 320000 },
		{ day: 'Mar 07, 2025 04:00PM', total_revenue: 55, sales: 200000 },
		{ day: 'Mar 08, 2025 04:00PM', total_revenue: 0, sales: 650000 },
	];

	return (
		<div className='bg-white rounded-[4px] md:rounded-[8px] pt-3 md:pt-5 px-3 md:px-6 pb-6 mt-4'>
			<div className='flex items-center justify-between flex-col gap-6 md:flex-row'>
				<Tabs
					selected={selected}
					setSelected={setSelected}
					items={['Revenue', 'Commission']}
				/>

				<div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-fit'>
					<Popover>
						<PopoverTrigger asChild>
							<button
								className='flex items-center justify-between md:gap-4 border text-sm text-black-950
              border-white-300 border-solid rounded-[4px] px-3 h-8 '>
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
								numberOfMonths={1}
							/>
						</PopoverContent>
					</Popover>

					<Select defaultValue={time} onValueChange={(e) => setTime(e)}>
						<SelectTrigger
							className='focus-visible:ring-0 focus-visible:outline-none text-sm text-black-950
             shadow-none h-8 border-white-300 focus-visible:border-white-300 select-chevron '>
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

			<div className='mt-8 -ml-10'>
				<ChartContainer config={chartConfig} className='max-h-[315px] w-full'>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} horizontal={true} />
						<XAxis
							dataKey='day'
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 6)}
							interval={1}
						/>
						<YAxis />
						<ChartTooltip cursor={false} content={<CustomTooltip />} />
						<Line
							dataKey='total_revenue'
							type='linear'
							stroke='var(--color-total_revenue)'
							strokeWidth={2}
							dot={{
								stroke: 'var(--color-total_revenue)',
							}}
							// activeDot={{
							// 	r: 6,
							// }}
						/>
					</LineChart>
				</ChartContainer>
			</div>
		</div>
	);
};

export default Chart;

const CustomTooltip = ({
	active,
	payload,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) => {
	if (active && payload && payload.length) {
		const item = payload[0].payload as { sales: number; day: string };

		return (
			<div className='bg-white rounded-[4px] border border-solid border-white-200 text-center py-1 px-2'>
				<p className='text-black-950 text-xs'>{item.day}</p>
				<p className='text-black-950 text-sm font-bold pt-2'>
					N{item.sales.toLocaleString()}
				</p>
			</div>
		);
	}
};
