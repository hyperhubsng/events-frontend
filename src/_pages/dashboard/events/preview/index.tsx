/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectPreviewEvent } from '@/features/tickets/ticketsSlice';
import { Button } from '@/components/ui/button';

import Gallery from './gallery';
import Details from './details';
import BreadcrumbWrapper from '@/components/breadcrumb';
import Tickets from './tickets';

const PreviewEvent = () => {
	const event: any = useAppSelector(selectPreviewEvent);

	const router = useRouter();

	const [galleryImages, setGalleryImages] = useState<string[]>([]);

	useEffect(() => {
		if (event) {
			Object.keys(event).forEach((item) => {
				if (item.includes('event_img')) {
					const imageUrl = URL.createObjectURL(event[item]);
					setGalleryImages((prev) => [...prev, imageUrl]);
				}
			});
		} else {
			router.replace('/events/create-event');
		}
	}, [event, router]);

	if (event) {
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

						<Gallery images={galleryImages.slice(0, 3)} />
						<section
							className='grid md:grid-cols-2 
	lg:grid-cols-[1.25fr_0.85fr] mt-6 gap-6'>
							<Details {...event} />
							<Tickets />
						</section>
					</div>
				</div>
			</BreadcrumbWrapper>
		);
	}
};

export default PreviewEvent;
