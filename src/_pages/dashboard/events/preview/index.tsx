'use client';

import { useAppSelector } from '@/lib/hooks';
import {
	selectPreviewEvent,
	selectTicketCategories,
} from '@/features/tickets/ticketsSlice';
import BreadcrumbWrapper from '@/components/breadcrumb';
import { Button } from '@/components/ui/button';

const PreviewEvent = () => {
	const event = useAppSelector(selectPreviewEvent);
	const eventTickets = useAppSelector(selectTicketCategories);
	// console.log(eventTickets);

	return (
		<BreadcrumbWrapper items={['Events', 'Create Event', 'Event Details']}>
			<div className='h-full p-4'>
				<div className='bg-white rounded-[4px] md:rounded-[8px] h-full p-4'>
					<div className='flex items-center justify-between'>
						<h2 className='text-base sm:text-2xl text-black-950 font-bold'>
							Preview Event
						</h2>

						<div className='flex items-center gap-4'>
							<Button variant={'outline'}>Save Draft</Button>
							<Button variant={'primary'}>Publish Event</Button>
						</div>
					</div>
				</div>
			</div>
		</BreadcrumbWrapper>
	);
};

export default PreviewEvent;
