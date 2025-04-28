'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useGetEventsAnalyticsQuery } from '@/features/dashboard/dashboardApi';
import { format } from 'date-fns';

import Pulse from '@/components/pulse';
import * as RechartsPrimitive from 'recharts';

const chartConfig = {
	events: {
		label: 'Events',
		color: 'var(--blue-50)',
	},
} satisfies ChartConfig;

interface RevenueDataItem {
	[date: string]: number;
}

interface FormattedDataItem {
	date: string;
	value: number;
}

const Events = () => {
	const [time, setTime] = useState('This Month');
	const times = ['This Month', 'This Year'];

	const match = useMediaQuery('(max-width: 600px)');

	const { data, isLoading, isFetching } = useGetEventsAnalyticsQuery({
		presentation: time == 'This Month' ? 'weekly' : 'monthly',
	});

	const chartData: FormattedDataItem[] | undefined = data?.data?.map(
		(item: RevenueDataItem) => {
			const [date, events] = Object.entries(item)[0];
			return { date, events };
		}
	);

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
				{isLoading || isFetching ? (
					<Pulse height='h-[200px] md:h-[300px]' />
				) : (
					<ChartContainer config={chartConfig} className='w-full'>
						<BarChart accessibilityLayer data={chartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey='date'
								axisLine={false}
								padding={
									chartData && chartData?.length <= 2
										? { left: 50, right: 50 }
										: { left: 0, right: 0 }
								}
								tickMargin={8}
								tickFormatter={(value) =>
									time !== 'This Month'
										? `${value.slice(0, 1).toUpperCase()}${value.slice(1, 3)}`
										: format(new Date(value), match ? 'dd/LL' : 'dd/MMM')
								}
								interval={0}
							/>
							<YAxis />
							<ChartTooltip content={<CustomTooltip />} />
							<Bar dataKey='events' stackId='a' fill='var(--color-events)' />
						</BarChart>
					</ChartContainer>
				)}
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
		const item = payload[0].payload as { events: number; date: string };

		return (
			<div className='bg-white rounded-[4px] border border-solid border-white-200 text-center py-1 px-2'>
				<p className='text-black-950 text-xs'>
					{item.date.includes('-')
						? format(new Date(item.date), 'do MMM')
						: item.date}
				</p>
				<p className='text-black-950 text-sm font-bold pt-2'>
					{item.events.toLocaleString()} Events
				</p>
			</div>
		);
	}
};
