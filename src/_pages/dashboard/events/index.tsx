'use client';

import { useState } from 'react';
import { useGetEventsQuery } from '@/features/events/eventsApi';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useDebounce } from '@/hooks/useDebounce';
import { selectEvents, setPreviewEvent } from '@/features/events/eventsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { icons } from '@/components/icons';

import EmptyEvents from './empty-events';
import Tabs from '@/components/tabs';
import Event from '../event';
import Link from 'next/link';
import Pulse from '@/components/pulse';

const Events = () => {
	const [selected, setSelected] = useState('Active');
	const [search, setSearch] = useState('');

	const debouncedSearchTerm = useDebounce(search, 300);
	const dispatch = useAppDispatch();

	const {
		data: events,
		isLoading,
		isFetching,
	} = useGetEventsQuery({
		...(selected !== 'Draft' && { status: selected.toLowerCase() }),
		...(debouncedSearchTerm && { q: debouncedSearchTerm }),
	});

	const draftEvents = useAppSelector(selectEvents);

	return (
		<div className='h-full p-4'>
			{events && events?.pagination.total === 0 && selected === 'Draft' ? (
				<EmptyEvents />
			) : (
				<div className='h-full bg-white rounded-[8px] md:rounded-2xl p-4 sm:p-6'>
					<div className='flex items-start md:items-center justify-between relative'>
						<h2 className='text-[1.25rem] sm:text-2xl text-black-950 font-bold absolute top-2 sm:relative sm:top-0'>
							Event
						</h2>

						<div className='flex items-center justify-end gap-4 flex-wrap-reverse w-full'>
							<div className='relative w-full sm:w-auto'>
								<svg
									width='13'
									height='15'
									viewBox='0 0 13 15'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
									className='absolute left-4 top-3'>
									<path
										d='M12.0273 6.36295C12.0273 9.49045 9.49165 12.0259 6.36364 12.0259C3.23563 12.0259 0.7 9.49045 0.7 6.36295C0.7 3.23546 3.23563 0.7 6.36364 0.7C9.49165 0.7 12.0273 3.23546 12.0273 6.36295Z'
										stroke='#C4C4D0'
										strokeWidth='1.4'
									/>
									<line
										x1='0.7'
										y1='-0.7'
										x2='4.69944'
										y2='-0.7'
										transform='matrix(-0.707145 -0.707069 0.707145 -0.707069 12.7261 14)'
										stroke='#C4C4D0'
										strokeWidth='1.4'
										strokeLinecap='round'
									/>
								</svg>

								<Input
									className='h-[40px] text-sm font-medium placeholder:text-white-300 
														placeholder:font-normal text-black-950 focus-visible:ring-0
														w-full sm:w-[15rem] pl-10
										'
									placeholder='Search'
									id='search'
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>

							<Link href='/events/create-event'>
								<Button
									variant={'primary'}
									className='!h-[40px] md:h-[48px]'
									onClick={() => dispatch(setPreviewEvent(null))}>
									+ Create Event
								</Button>
							</Link>
						</div>
					</div>

					<Tabs
						items={['Active', 'Upcoming', 'Past', 'Draft']}
						selected={selected}
						setSelected={setSelected}
						className='mt-4'
					/>

					{isLoading || isFetching ? (
						<Pulse height='h-[90%]' />
					) : (
						<>
							{selected !== 'Draft' ? (
								<>
									{events?.data?.length === 0 ? (
										<div className='flex flex-col items-center justify-center h-[80%] md:h-[90%]'>
											{icons.Events}
											<h3 className='text-[1.25rem] sm:text-[2rem] text-black-950 font-bold text-center mt-6'>
												No {selected} Event
											</h3>
										</div>
									) : (
										<ul className='mt-6 grid md:grid-cols-3 min-[1200px]:!grid-cols-4  gap-6'>
											{events?.data
												?.filter((item) => item?.softDelete !== true)
												.map((event) => (
													<Event {...event} key={event?._id} />
												))}
										</ul>
									)}
								</>
							) : (
								<>
									{draftEvents?.length === 0 ? (
										<div className='flex flex-col items-center justify-center h-[80%] md:h-[90%]'>
											{icons.Events}
											<h3 className='text-[1.25rem] sm:text-[2rem] text-black-950 font-bold text-center mt-6'>
												No {selected} Saved
											</h3>
										</div>
									) : (
										<ul className='mt-4 grid md:grid-cols-3 min-[1200px]:!grid-cols-4  gap-6'>
											{draftEvents.map((event) => (
												<Event {...event} key={event?._id} />
											))}
										</ul>
									)}
								</>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Events;
