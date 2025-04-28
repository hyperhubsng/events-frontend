'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGetRevenueAnalyticsQuery } from '@/features/dashboard/dashboardApi';
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
import { ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { formatCurrency } from '@/lib/utils';

import Pulse from '@/components/pulse';
import * as RechartsPrimitive from 'recharts';

const chartConfig = {
	total_revenue: {
		label: 'Total Revenue',
		color: 'var(--blue-50)',
	},
	sales: {
		label: 'Sales',
	},
} satisfies ChartConfig;

interface RevenueDataItem {
	[date: string]: number;
}

interface FormattedDataItem {
	date: string;
	value: number;
}

const Chart = () => {
	const [time, setTime] = useState('This Month');
	const match = useMediaQuery('(max-width: 769px)');
	const match2 = useMediaQuery('(max-width: 600px)');

	const times = ['This Month', 'This Year'];

	const [date, setDate] = useState<DateRange | undefined>({
		from: undefined,
		to: undefined,
	});

	const { data, isLoading, isFetching } = useGetRevenueAnalyticsQuery({
		presentation: time == 'This Month' ? 'weekly' : 'monthly',
		...(date?.from &&
			date?.to && { from: format(date?.from.toISOString(), 'yyyy-MM-dd') }),
		...(date?.to &&
			date?.from && { to: format(date?.to.toISOString(), 'yyyy-MM-dd') }),
	});

	const chartData: FormattedDataItem[] | undefined = data?.data?.map(
		(item: RevenueDataItem) => {
			const [date, total_revenue] = Object.entries(item)[0];
			return { date, total_revenue };
		}
	);

	return (
		<div className='bg-white rounded-[4px] md:rounded-[8px] pt-3 md:pt-5 px-3 md:px-6 pb-6 mt-4 overflow-hidden'>
			<div className='flex items-center justify-between flex-col gap-6 md:flex-row'>
				<h2 className='text-black-950 text-sm md:text-base lg:text-2xl font-semibold'>
					Revenue
				</h2>

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

			<div className='mt-8 -ml-8'>
				{isLoading || isFetching ? (
					<Pulse height='h-[200px] md:h-[315px]' />
				) : (
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
										: format(new Date(value), match2 ? 'dd/LL' : 'do MMM')
								}
								{...(match && { interval: 0 })}
							/>
							<YAxis tickFormatter={(value) => String(formatCurrency(value))} />
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
				)}
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
		const item = payload[0].payload as { total_revenue: number; date: string };

		return (
			<div className='bg-white rounded-[4px] border border-solid border-white-200 text-center py-1 px-2'>
				<p className='text-black-950 text-xs capitalize'>
					{item.date.includes('-')
						? format(new Date(item.date), 'do MMM')
						: item.date}
				</p>
				<p className='text-black-950 text-sm font-bold pt-2'>
					N{item.total_revenue.toLocaleString()}
				</p>
			</div>
		);
	}
};
