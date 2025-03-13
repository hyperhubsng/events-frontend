'use client';

import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Pie, PieChart } from 'recharts';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';

const Organizers = () => {
	const [time, setTime] = useState('This Year');
	const times = ['This Year', 'Last Year', 'Two Years ago'];

	const chartData = [
		{ organizers: 'active', number: 30, fill: 'var(--blue-50)' },
		{ organizers: 'inactive', number: 2, fill: 'var(--yellow-800)' },
	];

	const chartConfig = {
		organizers: {
			label: 'Organizers',
		},
		active: {
			label: 'Active',
			color: 'var(--blue-50)',
		},
		inactive: {
			label: 'Inactive',
			color: 'var(--yellow-800)',
		},
	} satisfies ChartConfig;

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

			<div className='mt-8'>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square max-h-[250px]'>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey='number'
							nameKey='organizers'
							innerRadius={60}
							label
						/>
						<ChartLegend
							content={<ChartLegendContent nameKey='organizers' />}
							className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center'
						/>
					</PieChart>
				</ChartContainer>
			</div>
		</div>
	);
};

export default Organizers;
