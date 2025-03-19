/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { selectPreviewEvent } from '@/features/tickets/ticketsSlice';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import Gallery from './gallery';
import Details from './details';
import BreadcrumbWrapper from '@/components/breadcrumb';
import Tickets from './tickets';

const PreviewEvent = () => {
	const event: any = useAppSelector(selectPreviewEvent);

	const router = useRouter();

	const [galleryImages, setGalleryImages] = useState<string[]>([]);
	const [openModal, setOpenModal] = useState(false);

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
								<Dialog open={openModal} onOpenChange={setOpenModal}>
									<DialogTrigger asChild>
										<Button variant={'primary'}>Publish Event</Button>
									</DialogTrigger>
									<DialogContent>
										<div className='flex flex-col items-center'>
											<svg
												width='65'
												height='65'
												viewBox='0 0 65 65'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'>
												<rect
													x='2.5'
													y='2.5'
													width='60'
													height='60'
													rx='30'
													fill='#FEEDB8'
												/>
												<rect
													x='2.5'
													y='2.5'
													width='60'
													height='60'
													rx='30'
													stroke='#FEF6DB'
													strokeWidth='4'
												/>
												<path
													d='M33.4009 33.4002H30.4676V24.6002H33.4009V33.4002ZM33.4009 39.2668H30.4676V36.3335H33.4009V39.2668ZM31.9342 17.2668C30.0082 17.2668 28.101 17.6462 26.3216 18.3833C24.5421 19.1203 22.9253 20.2007 21.5633 21.5626C18.8128 24.3131 17.2676 28.0437 17.2676 31.9335C17.2676 35.8234 18.8128 39.5539 21.5633 42.3044C22.9253 43.6663 24.5421 44.7467 26.3216 45.4837C28.101 46.2208 30.0082 46.6002 31.9342 46.6002C35.8241 46.6002 39.5546 45.0549 42.3051 42.3044C45.0557 39.5539 46.6009 35.8234 46.6009 31.9335C46.6009 30.0075 46.2215 28.1003 45.4845 26.3208C44.7474 24.5414 43.6671 22.9245 42.3051 21.5626C40.9432 20.2007 39.3264 19.1203 37.5469 18.3833C35.7675 17.6462 33.8603 17.2668 31.9342 17.2668Z'
													fill='#CAA93E'
												/>
											</svg>
											<DialogHeader className='mt-4 !text-center'>
												<DialogTitle className='text-base sm:text-[1.25rem] text-black-950 font-bold'>
													Publish Event
												</DialogTitle>
												<DialogDescription className='text-sm text-black-700 max-w-[20rem]'>
													Proceeding would create the event and ticket would be
													available for sale.
												</DialogDescription>
											</DialogHeader>

											<Button variant={'primary'} className='mt-10 w-full'>
												Publish
											</Button>
										</div>
									</DialogContent>
								</Dialog>
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
